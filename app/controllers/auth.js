import user from "../models/user.js";
import Jwt from "jsonwebtoken";
import sha256 from "sha256";

export const createUser = async (req, res) => {
  const {name,email,password} = req.body;
  let psw = sha256(req.body.password)

  try {
    await user.create({
      name : name,
      email : email,
      password : psw
    });
    res.json({
        'status' : 200,
        'message' : 'User Created Successfully!',
        'data' : []
    });
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const loginUser = async (req, res) => {
  const {email,password} = req.body;
  try{
    const login = await user.findAll({
      where : {
        'email' : email
      }
    });
    if(login.length != null){
      let psw = login[0].password;
      let pswLogin = sha256(password);
      let privateKey = `-----BEGIN RSA PRIVATE KEY-----
      MIICWgIBAAKBgFLSdvchxZobq2n4vN0qs2dOTxa3EJ/KK8/rpo6f2RkFYCxSjQyP
      oijEOX3buaq/hPzJe2/k9KYbglMXlgz2XVl4GNoOxMhKnyl8NEet0nSyu2fMam3G
      t9+n1i8dH7TZvgHZJFvAEqdgoHteiM9UT0PGiF1kn3jyglkowQCMeAMnAgMBAAEC
      gYA428RQZR8DbXuAhQMj0uzXPyuMrKD9Eg6B74Wo5JRmWQptYz7yIKly00Ok4/PT
      BSiHYssbRlOutbQC125r97adrYqIQ8Azl2UuuH9169IauSbuIfq9k5PaajQTv38U
      YNGpQOUB98zS0MCYfpNp5UsOigWaqjArOL9AKi+O/maUAQJBAJaR0hg9HfrlV/eY
      MonUQtiooTVLiruSLKcEvDWGyAKVwnKIjILjWaWgjzVNdLc70IMUmrR/r+4bAa1n
      edkPiQ8CQQCM0KXspk2uoQVsUBMS1QIVa8UVP9hm0Jb5c99+P/VmDZttFQ5wFQYw
      JY9OfWZO2IbOzvROGu3tlaErVBpJInRpAkAOQqtSTl+LhrMpKQoIUcku+fGiuY/f
      Kf3+p40nyKciz4pGDLa6Isw3ypglpTtbq1eZQpdQZxODip1DDhzVOQpzAkB5uFnU
      6CQ6EUIo0EbMfofgkFm59ohOx3vZgUntTcgIQTba4dqrE+FXeQAZLthiy1QsLESN
      x0Vnm3HHjFl0Ym4RAkBOOQ3rGXUa5Ut1VFvrSH20Db46I9vw2a2loWuls/9DUhxe
      ZjVCYOpOnugDkilH/kE4V/45Pq51XWYYLdEH9krj
      -----END RSA PRIVATE KEY-----`;
        
      let payload = {
          "iss": "THE CLAIM",
          "sub": "THE_AUDIENCE",
          "aud": "odama",
          "iat": 1639642308,
          "exp": Math.floor(Date.now() / 1000) + (60 * 60),
          "data" : {
            'id' : login[0].id,
            'name' : login[0].name,
            'email' : email
          }
      };

      if(psw == pswLogin){
        const token = Jwt.sign(payload, privateKey);
        const data = {
          'status' : 200,
          'message' : 'Login Successfully',
          'data' : {
            'name' : login[0].name,
            'email' : email,
            'token' : token,
            'expireAt' : 6000
          }
        };
        res.json(data);
      }else{
        res.json({
          'status' : 503,
          'message' : "Login Failed!",
          'data' : []
        });
      }
    }else{
      res.json({
        'status' : 503,
        'message' : "Login Failed!",
        'data' : []
      });
    }
  }catch(error){
    res.json(error);
  }
}