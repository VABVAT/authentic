create a fullstack

1. store token in local storage and retrieve it as per demand
2. host html on backend as well
3. use backend authentication logic similar to done in week6
4. HINTS -> localstorage.get, localstorage.set, res.sendfile(__dirname), jwt.verify, jwt.sign , await fetch
5. token set needs to be done in signin and also replaced in local storage


important points
1. local storage is accesed through frontend only
2. jwt token is always different even for same user and password