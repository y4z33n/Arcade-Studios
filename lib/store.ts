// Simple module-level reactive state for menu open/close
// Used to communicate between Navbar and FloatingCTA without prop drilling

type Listener = (open: boolean) => void;

let _menuOpen = false;
const _listeners = new Set<Listener>();

export const menuState = {
  get open() {
    return _menuOpen;
  },
  setOpen(open: boolean) {
    _menuOpen = open;
    _listeners.forEach((fn) => fn(open));
  },
  subscribe(fn: Listener) {
    _listeners.add(fn);
    return () => _listeners.delete(fn);
  },
};

