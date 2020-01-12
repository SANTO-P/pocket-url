const config = require("config");
const url = require("url");
const shortid = require("shortid");
const validUrl = require("valid-url");

const Url = require("../models/Url");

const formatUrl = longUrl => {
  const parsedUrl = url.parse(longUrl);
  if (parsedUrl.protocol == null) {
    longUrl = "http://" + longUrl;
  }
  return longUrl;
};

const shortenUrl = async longUrl => {
  const baseUrl = config.get("baseUrl");
  let result = {
    status: undefined,
    url: undefined,
    errorMessage: undefined
  };

  if (!validUrl.isUri(baseUrl)) {
    result = {
      status: 401,
      errorMessage: "Invalid Base Url..."
    };
    return result;
  }

  longUrl = formatUrl(longUrl);

  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });

      if (url) {
        result = {
          status: 200,
          url: url
        };
        return result;
      } else {
        let urlCode = shortid.generate();
        while (await Url.findOne({ urlCode })) {
          urlCode = shortid.generate();
        }

        const shortUrl = baseUrl + "/" + urlCode;
        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date(),
          hitCount: 0
        });

        await url.save();
        result = {
          status: 200,
          url: url
        };
        return result;
      }
    } catch (err) {
      result = {
        status: 500,
        errorMessage: "Server error..."
      };
      return result;
    }
  } else {
    result = {
      status: 422,
      errorMessage: "Invalid Long Url..."
    };
    return result;
  }
};

const shortenWithCustomUrl = async (longUrl, urlCode) => {
  const baseUrl = config.get("baseUrl");
  let result = {
    status: undefined,
    url: undefined,
    errorMessage: undefined
  };

  if (!validUrl.isUri(baseUrl)) {
    result = {
      status: 401,
      errorMessage: "Invalid Base Url..."
    };
    return result;
  }

  longUrl = formatUrl(longUrl);

  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });
      if (url) {
        await Url.deleteOne({ longUrl });
      }

      let customUrlCode = await Url.findOne({ urlCode });
      if (customUrlCode) {
        result = {
          status: 401,
          url: "Custom url already exists..."
        };
        return result;
      }

      const shortUrl = baseUrl + "/" + urlCode;
      url = new Url({
        longUrl,
        shortUrl,
        urlCode,
        date: new Date(),
        hitCount: 0
      });

      await url.save();
      result = {
        status: 200,
        url: url
      };
      return result;
    } catch (err) {
      result = {
        status: 500,
        url: "Server error..."
      };
      return result;
    }
  } else {
    result = {
      status: 422,
      url: "Invalid Long Url..."
    };
    return result;
  }
};

module.exports = {
  shortenUrl,
  shortenWithCustomUrl
};
