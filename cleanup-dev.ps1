# Cleanup script for Next.js dev server issues
# Removes stale lock files and kills processes on ports 3000/3001

Write-Host "Cleaning up Next.js dev server..." -ForegroundColor Cyan

# Remove lock file
$lockPath = ".\.next\dev\lock"
if (Test-Path $lockPath) {
    Remove-Item -Path $lockPath -Force
    Write-Host "✓ Removed lock file" -ForegroundColor Green
} else {
    Write-Host "✓ No lock file found" -ForegroundColor Green
}

# Find and kill processes on ports 3000 and 3001
$ports = @(3000, 3001)
foreach ($port in $ports) {
    $connections = netstat -ano | Select-String ":$port.*LISTENING"
    foreach ($conn in $connections) {
        $pid = ($conn -split '\s+')[-1]
        if ($pid -match '^\d+$') {
            try {
                $process = Get-Process -Id $pid -ErrorAction Stop
                Write-Host "Killing process $pid ($($process.ProcessName)) on port $port..." -ForegroundColor Yellow
                Stop-Process -Id $pid -Force -ErrorAction Stop
                Write-Host "✓ Process terminated" -ForegroundColor Green
            } catch {
                Write-Host "⚠ Could not kill process $pid: $_" -ForegroundColor Yellow
            }
        }
    }
}

Write-Host "`nCleanup complete! You can now run 'bun run dev'" -ForegroundColor Cyan




