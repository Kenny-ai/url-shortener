class UrlShortener {
  shortURLs: Map<string, string>;
  longURLs: Map<string, string>;
  prefix: string;
  codeGenerator: (len: number) => string;

  constructor() {
    this.shortURLs = new Map();
    this.longURLs = new Map();
    this.prefix = "short.ly/";
    this.codeGenerator = (len) => {
      const alphabets = "abcdefghijklmnopqrstuvwxyz0123456789";
      let result = "";
      const alphaLength = alphabets.length;
      for (let i = 0; i < len; i++) {
        result += alphabets.charAt(Math.floor(Math.random() * alphaLength));
      }
      return result;
    };
  }

  shorten(longUrl: string):string {
    if (!this.longURLs.has(longUrl)) {
      let shortUrl =
        this.prefix + this.codeGenerator(Math.floor(Math.random() * 4) + 1);
      this.longURLs.set(longUrl, shortUrl);
      this.shortURLs.set(shortUrl, longUrl);
      return shortUrl;
    } else return this.longURLs.get(longUrl)!;
  }

  redirect(shortUrl: string) {
    if (this.shortURLs.has(shortUrl)) return this.shortURLs.get(shortUrl);
  }
}

export const app = new UrlShortener();
