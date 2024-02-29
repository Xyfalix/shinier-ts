import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const checkToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authHeader:string | undefined = req.get("Authorization");

  if (!authHeader) {
    res.status(401).json({ err: "No token in header" });
    return;
  }

  const authHeaderArray: string[] = authHeader.split(" ");
  const token: string | undefined = authHeaderArray[1];

  try {
    const decoded: string | JwtPayload = jwt.verify(token, process.env.SECRET as string);

    if (typeof decoded === 'string') {
      throw new Error('Invalid token');
    }

    res.locals.userId = decoded._id;
    res.locals.userRole = decoded.role;
    next();
  } catch (err) {
    res.status(401).json({ err });
  }
};

function checkAdminRole(req: Request, res: Response, next: NextFunction) {
  // Check if the user has the "admin" role
  if (res.locals.userRole === "admin") {
    next(); // User is an admin, proceed to the route
  } else {
    res.status(403).json({ err: "Access forbidden" });
  }
}

export {
  checkToken,
  checkAdminRole,
};