window.onload = function () {
  const opt = { headers: { "content-type": "application/json" }, method: "GET" };

  fetch('https://your-swagger-api.com/dev/swagger', opt).then(data => { return data.json() }).then(res_urls => {
    console.log(res_urls);

    window.ui = SwaggerUIBundle({
      // url: "https://petstore.swagger.io/v2/swagger.json",
      urls: res_urls,
      "urls.primaryName": res_urls[0].name,  // default document (if other than the first)
      dom_id: '#swagger-ui',
      deepLinking: true,
      presets: [
        SwaggerUIBundle.presets.apis,
        SwaggerUIStandalonePreset
      ],
      plugins: [
        SwaggerUIBundle.plugins.DownloadUrl
      ],
      layout: "StandaloneLayout"
    })
  });
};
