export function login(req: any) {
  req.session.isLoggedIn = true;
}

export function logout(req: any) {
  req.session.isLoggedIn = false;
}

export function logged_in(req: any) {
  return req.session.isLoggedIn || false;
}