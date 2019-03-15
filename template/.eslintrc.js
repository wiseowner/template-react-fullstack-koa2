module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "parser": "babel-eslint",
    "extends": "eslint:recommended",
      "globals": {
        "i18n": true,
        "AuthError": true,
        "RedirectError": true,
        "RequestError": true,
        "window": true,
        "fetch": true,
    },
    "rules": {
        "indent": ["warn", 2],
        
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-console": 0
    }
};