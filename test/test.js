const json = '{"result":true, "count":42}';
const obj = JSON.parse(json);

console.log(obj)
console.log(json)

console.log(obj.count)
console.log(json.count)

obj1 = {
    a: 1,
    b: true
}

console.log(obj1.b)

json1 = {
    "aa": 1,
    "bb": true
}

console.log(json1.bb)

const jsonText = `{
    "browsers": {
      "firefox": {
        "name": "Firefox",
        "pref_url": "about:config",
        "releases": {
          "1": {
            "release_date": "2004-11-09",
            "status": "retired",
            "engine": "Gecko",
            "engine_version": "1.7"
          }
        }
      }
    }
  }`;
  
  console.log(JSON.parse(jsonText));

  const jt = JSON.parse(jsonText)

console.log(jt.browsers.firefox.releases)

const obj12 = jt.browsers.firefox.releases

console.log(JSON.stringify(obj12))