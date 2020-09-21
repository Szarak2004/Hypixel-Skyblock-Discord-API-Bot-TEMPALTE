  # Hypixel Skyblock Discord API Bot TEMPALTE
Instructions:
After downloading this repo, make sure to make a .env file with:
```
api_key=       <--- Hypixel API key
token=        <--- Discord token
```

Right now it gives you 1.6k lines of JSON with all info about your profile. To change it, you can add .[directory] to
```js
let responseData = JSON.parse(body).[].[].[] //Line 17
```
Example for getting player deaths:
```js
let responseData = JSON.parse(body).profile.members[UUID].stats.deaths;
```
Full JSON file is also located in this repository, so you can check out which stats are avaiable to see (OUTDATED, FOR MORE CHECK HYPIXEL API)
To check Hypixel API you can also go to:
```
https://api.hypixel.net/skyblock/profile?key=[API KEY ("/api new" in game)]&profile=[UUID of player account];
```
