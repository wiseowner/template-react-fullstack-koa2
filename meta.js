module.exports = {
  "prompts": {
    "database": {
      "type": "confirm",
      "message": "Do backend use database?",
      "default": false
    },
    "i18n": {
      "type": "confirm",
      "message": "Do you use i18n?",
      "default": false
    }
  },
  "filters": {
    "Backend/db/**/*": "database",
    "Backend/config/locales/*": "i18n",
    "App/src/i18n/**/*": "i18n",
    "App/locale/**/*": "i18n",
  }
}
