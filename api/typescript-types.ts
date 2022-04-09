export type LoginJWT = {
  userId?: string;
};

export type Viewer = {
  userId?: string;
  isAdmin?: boolean;
};

export type Context = {
  viewer: Viewer;
};
