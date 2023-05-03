# Node.js back end with TypeScript



```mermaid
	flowchart LR
	project --> gitignore(.gitignore)
	project{{project}} --> client((client))
	project --> server((server))
	
	client --> src_client(src)
	src_client --> environments(environments)
	environments --> local(environment.local.ts)
	environments --> dev(envionment.dev.ts)
	environments --> uat(environment.uat.ts)
	environments --> prod(environment.prod.ts)

	server --> apiTest(api_test)
	server --> app(app)
	server --> src_server(src)
	server --> dist(dist)
	server --> database(database)
	app --> angular(Angular)
	src_server --> app_mts(app.mts)
	database --> mongodb(mongodb)
	database --> sql(sql)
	mongodb --> models_mongodb(models)
	mongodb --> controllers_mongodb(controllers)
	mongodb --> routes_mongodb(routes)
	sql --> models_sql(models)
	sql --> controllers_sql(controllers)
	sql --> routes_sql(routes)

	style project fill: navy
	style client fill: #BF5700
	style server fill: purple
	
	style gitignore fill: blue
	style local fill: orange 
	style dev fill: orange
	style uat fill: orange
	style prod fill: orange
	style src_server fill: purple
	
	style src_client fill: #BF5700
	style environments fill: #BF5700
	
	style apiTest fill: purple
	style app fill: purple
	style database fill: purple
	style dist fill: purple
	style angular fill: purple
	style mongodb fill: purple
	style sql fill: purple
	style models_mongodb fill: purple
	style controllers_mongodb fill: purple
	style routes_mongodb fill: purple
	style models_sql fill: purple
	style controllers_sql fill: purple
	style routes_sql fill: purple
	style app_mts fill: violet
```


```
project
	|
	|
	|--client
	|     |
	|     |--environments
	|             |
	|             |
	|             |--local (developement work in Linux VM using Angular cli in memory server + node.js back end, with cors enabled)
	|             |
	|             |
	|             |--dev (for test in Azure)
	|             |
	|             |
	|             |--uat (user acceptance test)
	|             |
	|             |
	|             |--prod (production)
	|
	|
	|--server
	|     |
	|     |
	|     |--api_test (.http files)
	|     |
	|     |
	|     |--src (TypeScript source code)
	|     |     |
	|     |     |
	|     |     |--app.mts (entry point)
	|     |
	|     |
	|     |--dist (transpiled JavaScript)
	|     |
	|     |
	|     |--database  
	|     |     |
	|     |     |
	|     |     |--mongodb
	|     |     |   |
	|     |     |   |
	|     |     |   |--models (schema and model definition)
	|     |     |   |
	|     |     |   |
	|     |     |   |--controllers (callback functions)
	|     |     |   |
	|     |     |   |
	|     |     |   |--routes
	|     |     |
	|     |     |
	|     |     |--sql
	|     |         |
	|     |         |
	|     |         |--models (model definition)
	|     |         |
	|     |         |
	|     |         |--controllers (callback functions)
	|     |         |
	|     |         |
	|     |         |--routes
	|     |
	|     |
	|     |--app
	|        |
	|        |
	|        |--angular (compiled Angular project. ng build --output-path='../server/app/Angular' -c=uat)
	|
	|
	|--.gitignore

```
