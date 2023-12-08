const jwt = require("jsonwebtoken");

const blacklist = new Set();

async function logout(accessToken) {
  if (!blacklist.has(accessToken)) {
    blacklist.add(accessToken);
  }
}

// Hàm kiểm tra xem token có trong danh sách đen hay không
function isTokenBlacklisted(accessToken) {
  return blacklist.has(accessToken);
}

async function verifyToken(token) {
  if (isTokenBlacklisted(token)) {
    return false;
  }
  try {
    return jwt.verify(token, process.env.TOKEN_KEY);
  } catch (error) {
    console.error("Token verification error:", error);
    return false;
  }
}

const middlewareToken = {
  // Middleware kiểm tra token và role
  verifyToken: async (req, res, next) => {
    const token = req.headers.authorization;
    try {
      if (token) {
        const accessToken = token.split(" ")[1];
        const user = await verifyToken(accessToken);
        if (!user) {
          res.status(403).json("Token is not vaild");
        } else {
          if (
            user.role == 1 ||
            user.role == 2 ||
            user.role == 3 ||
            user.role == 4
          ) {
            req.user = user;
            next();
          } else {
            res.status(403).json("Bạn không có quyền");
          }
        }
      } else {
        res.status(401).json("Bạn không được xác thực");
      }
    } catch (error) {
      res.status(403).json(error);
    }
  },

  // Middleware kiểm tra token và quyền role 1 và 2
  checkRoleEmployees: async (req, res, next) => {
    const token = req.headers.authorization;
    try {
      if (token) {
        const accessToken = token.split(" ")[1];
        const user = await verifyToken(accessToken);
        if (!user) {
          res.status(403).json("Token is not vaild");
        } else {
          if (user.role == 1 || user.role == 2 || user.role == 3) {
            req.user = user;
            next();
          } else {
            res.status(403).json("Bạn không có quyền");
          }
        }
      } else {
        res.status(401).json("Bạn không được xác thực");
      }
    } catch (error) {
      res.status(403).json(error);
    }
  },
  checkRoleManager: async (req, res, next) => {
    const token = req.headers.authorization;
    try {
      if (token) {
        const accessToken = token.split(" ")[1];
        const user = await verifyToken(accessToken);
        if (!user) {
          res.status(403).json("Token is not vaild");
        } else {
          if (user.role == 1 || user.role == 2) {
            next();
          } else {
            res.status(403).json("Bạn không có quyền");
          }
        }
      } else {
        res.status(401).json("Bạn không được xác thực");
      }
    } catch (error) {
      res.status(403).json(error);
    }
  },

  // Middleware kiểm tra token và quyền role 1
  checkRoleAdmim: async (req, res, next) => {
    const token = req.headers.authorization;
    try {
      if (token) {
        const accessToken = token.split(" ")[1];
        const user = await verifyToken(accessToken);
        if (!user) {
          res.status(403).json("Token is not vaild");
        } else {
          if (user.role == 1) {
            next();
          } else {
            res.status(403).json("Bạn không có quyền");
          }
        }
      } else {
        res.status(401).json("Bạn không được xác thực");
      }
    } catch (error) {
      res.status(403).json(error);
    }
  },

  logout: async (req, res) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        res.status(401).json("Bạn không được xác thực");
      } else {
        const accessToken = token.split(" ")[1];
        const user = await verifyToken(accessToken);
        if (!user) {
          res.status(403).json("Token is not vaild");
        } else {
          await logout(accessToken);
          res.status(200).json("Logout successful");
        }
      }
    } catch (error) {
      res.status(500).json("Loi");
    }
  },
};

module.exports = middlewareToken;
