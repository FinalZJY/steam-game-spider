# steam-game-spider
![GitHub repo size](https://img.shields.io/github/repo-size/FinalZJY/steam-game-spider)
![GitHub License](https://img.shields.io/github/license/FinalZJY/steam-game-spider)


A Node.js script to fetching Steam game info. The data will be saved as JSON files.

## Requirement
- Node.js v16 or higher

## Usage
Install dependencies.
```sh
npm install
```

### Fetch Steam app list.

```sh
npm run app-list
```

The data will be saved in `./data/appList.json`.

The data structure of `appList.json` may be like:
```json
[
  {
    "appid": 358150,
    "name": "PAYDAY 2: The Butcher's BBQ Pack"
  }
]
```


Fields of the data:

| Field name | Description                | Data Source                      |
|------------|----------------------------|----------------------------------|
| **appid**  | The id of an app/game.     | [Steam Web API](#Steam-Web-API). |
| **name**   | The name of this app/game. | [Steam Web API](#Steam-Web-API). |

You will find some apps' name are `""`, or like `"test2"`.
Usually, you can not find the game detail page in Steam Store.
I guess these apps were created by Steam or publishers for testing purpose.

### Fetch all apps' detail.
**It will task at least 100 hours and more than 2GB storage space.**

```sh
npm run game-detail
```

The data will be saved in `./data/game_${index}.json`, such as `./data/game_1.json`. You will find files in `./data/` like:
```
- data/
  - game_1.json
  - game_2.json
  - game_3.json
```

> **Why should the data be divided into chunks:**
> A file that is too large can not be read/write at once because it exceeds the maximum length of a JavaScript string.
> Also, it will take too much time to serialize for large JSON.

The data structure of `game_${index}.json` may be like:
```json
[
  {
    "appid": 2005791,
    "name": ""
  },
  {
    "appid": 358150,
    "name": "PAYDAY 2: The Butcher's BBQ Pack",
    "detail": {
      "type": "dlc",
      "name": "PAYDAY 2: The Butcher's BBQ Pack",
      "steam_appid": 358150,
      "required_age": "18",
      "is_free": false,
      "controller_support": "full",
      "detailed_description": "<img class=\"bb_img\" src=\"https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/358150/extras/bbq_pack_Banner.jpg?t=1727961605\" /><br><br><strong>It's Sizzling Hot!</strong><br><br>The BBQ Weapon Pack is our 20th DLC for PAYDAY 2. Amp up your play style with the Fire based weapons so you can spew out flames like only a dragon could.<br><br>Tired of the long, dark nights of howling cold? Over the snow and ice and biting sleet? Well, we at OVERKILL are proud and excited to bring you a party that is guaranteed to heat things up and blow away the winter blues – the smokin’ hot BBQ Weapon Pack. Featuring a loaded menu of fresh treats – fiery weapons, mouth-filling melee, and a heaping side of new ordnance. And what would a party be without cool masks, materials and patterns? We got them too!<h2 class=\"bb_tag\">Key Features</h2><img class=\"bb_img\" src=\"https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/358150/extras/bbq_pack_banner_firearms.jpg?t=1727961605\" /><br>•\t<strong>Piglet Grenade Launcher, 12G Steakout Shotgun</strong> – A popular menu item with grandparents and children alike, the ‘Piglet’ grenade launcher is a classic. A piece of drum-loaded mobile artillery that brings pump-and-thump action to your table and explosive mayhem to the next. Add our Millionaire’s Bacon for a sweet and salty maple treat. When you’re so hungry you feel you could rip a skulldozer in half with your teeth, we suggest ordering the 12G ‘Steakout’ shotgun. Lovingly crafted from organic polymers, layered with locally sourced stainless-steel, the ‘Steakout’ brings the sharp kick you want. Try it with our curly fries for from-the-hip satisfaction.<br><br><img class=\"bb_img\" src=\"https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/358150/extras/bbq_pack_banner_flamethrower.jpg?t=1727961605\" /><br>•\t<strong>Did we mention the Flamethrower Mk.1?</strong> – Feel the heat with our fully-loaded, super-sized ‘Flammenwerfer’. Dripping with delicious thickened pyrophoric fluids, smoldering with smokin’ ignition topping and capable of spraying eye-watering hot sauce up to 20 yards, the Flamethrower is one of our most served dishes. See that skin sizzle! Try it with our Asian ‘slaw and a guava sun-tea!<br><br><img class=\"bb_img\" src=\"https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/358150/extras/bbq_pack_banner_flammable.jpg?t=1727961605\" /><br>•\t<strong>Molotov cocktails and incendiary ammo</strong> – The Molotov cocktail is perhaps the simplest weapon that can call itself a grenade. Nothing more than a breakable bottle of flammable liquid with a ‘fuse’ replaced by a burning rag. It is cheap, simple and highly effective. Enjoy with jalapeño poppers. Other than that, we've also taken the liberty of adding incendiary ammo. Enjoy the Spirited Dragon's Breath rounds and the spicy Incendiary rounds.<br><br><img class=\"bb_img\" src=\"https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/358150/extras/bbq_pack_banner_mask.jpg?t=1727961605\" /><br>•\t<strong>Four new masks</strong> – Four new masks for you and your friends! The Gas mask, Graug, The Chief and the Firefighter are the four new masks based around the theme of fire that you get by buying this pack.<br><br><img class=\"bb_img\" src=\"https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/358150/extras/bbq_pack_Banner_materials.jpg?t=1727961605\" /><br>•\t<strong>Four new materials</strong> –  Four new materials are available for your mask making pleasure - all of them are somehow connected to the theme of fire.<br><br><img class=\"bb_img\" src=\"https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/358150/extras/bbq_pack_patterns.jpg?t=1727961605\" /><br>•\t<strong>Four new patterns</strong> –  Four fiery patterns have also been added. Use them to modify your masks to get that special fiery look.<br><br><img class=\"bb_img\" src=\"https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/358150/extras/bbq_pack_Banner_achievements.jpg?t=1727961605\" /><br>•\t<strong>Four new achievements to unlock</strong> – These achievements have been in the cookin' for some time and are now ready to be enjoyed by you and your friends. How about &quot;Disco Inferno&quot;, &quot;Stick a Fork In Me, I'm Done&quot;, &quot;Not Invited&quot; or &quot;OVERGRILL&quot;? Sounds good? Well go ahead and buy the pack then!",
      "about_the_game": "<img class=\"bb_img\" src=\"https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/358150/extras/bbq_pack_Banner.jpg?t=1727961605\" /><br><br><strong>It's Sizzling Hot!</strong><br><br>The BBQ Weapon Pack is our 20th DLC for PAYDAY 2. Amp up your play style with the Fire based weapons so you can spew out flames like only a dragon could.<br><br>Tired of the long, dark nights of howling cold? Over the snow and ice and biting sleet? Well, we at OVERKILL are proud and excited to bring you a party that is guaranteed to heat things up and blow away the winter blues – the smokin’ hot BBQ Weapon Pack. Featuring a loaded menu of fresh treats – fiery weapons, mouth-filling melee, and a heaping side of new ordnance. And what would a party be without cool masks, materials and patterns? We got them too!<h2 class=\"bb_tag\">Key Features</h2><img class=\"bb_img\" src=\"https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/358150/extras/bbq_pack_banner_firearms.jpg?t=1727961605\" /><br>•\t<strong>Piglet Grenade Launcher, 12G Steakout Shotgun</strong> – A popular menu item with grandparents and children alike, the ‘Piglet’ grenade launcher is a classic. A piece of drum-loaded mobile artillery that brings pump-and-thump action to your table and explosive mayhem to the next. Add our Millionaire’s Bacon for a sweet and salty maple treat. When you’re so hungry you feel you could rip a skulldozer in half with your teeth, we suggest ordering the 12G ‘Steakout’ shotgun. Lovingly crafted from organic polymers, layered with locally sourced stainless-steel, the ‘Steakout’ brings the sharp kick you want. Try it with our curly fries for from-the-hip satisfaction.<br><br><img class=\"bb_img\" src=\"https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/358150/extras/bbq_pack_banner_flamethrower.jpg?t=1727961605\" /><br>•\t<strong>Did we mention the Flamethrower Mk.1?</strong> – Feel the heat with our fully-loaded, super-sized ‘Flammenwerfer’. Dripping with delicious thickened pyrophoric fluids, smoldering with smokin’ ignition topping and capable of spraying eye-watering hot sauce up to 20 yards, the Flamethrower is one of our most served dishes. See that skin sizzle! Try it with our Asian ‘slaw and a guava sun-tea!<br><br><img class=\"bb_img\" src=\"https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/358150/extras/bbq_pack_banner_flammable.jpg?t=1727961605\" /><br>•\t<strong>Molotov cocktails and incendiary ammo</strong> – The Molotov cocktail is perhaps the simplest weapon that can call itself a grenade. Nothing more than a breakable bottle of flammable liquid with a ‘fuse’ replaced by a burning rag. It is cheap, simple and highly effective. Enjoy with jalapeño poppers. Other than that, we've also taken the liberty of adding incendiary ammo. Enjoy the Spirited Dragon's Breath rounds and the spicy Incendiary rounds.<br><br><img class=\"bb_img\" src=\"https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/358150/extras/bbq_pack_banner_mask.jpg?t=1727961605\" /><br>•\t<strong>Four new masks</strong> – Four new masks for you and your friends! The Gas mask, Graug, The Chief and the Firefighter are the four new masks based around the theme of fire that you get by buying this pack.<br><br><img class=\"bb_img\" src=\"https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/358150/extras/bbq_pack_Banner_materials.jpg?t=1727961605\" /><br>•\t<strong>Four new materials</strong> –  Four new materials are available for your mask making pleasure - all of them are somehow connected to the theme of fire.<br><br><img class=\"bb_img\" src=\"https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/358150/extras/bbq_pack_patterns.jpg?t=1727961605\" /><br>•\t<strong>Four new patterns</strong> –  Four fiery patterns have also been added. Use them to modify your masks to get that special fiery look.<br><br><img class=\"bb_img\" src=\"https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/358150/extras/bbq_pack_Banner_achievements.jpg?t=1727961605\" /><br>•\t<strong>Four new achievements to unlock</strong> – These achievements have been in the cookin' for some time and are now ready to be enjoyed by you and your friends. How about &quot;Disco Inferno&quot;, &quot;Stick a Fork In Me, I'm Done&quot;, &quot;Not Invited&quot; or &quot;OVERGRILL&quot;? Sounds good? Well go ahead and buy the pack then!",
      "short_description": "It's Sizzling Hot!The BBQ Weapon Pack is our 20th DLC for PAYDAY 2. Amp up your play style with the Fire based weapons so you can spew out flames like only a dragon could.Tired of the long, dark nights of howling cold? Over the snow and ice and biting sleet?",
      "fullgame": {
        "appid": "218620",
        "name": "PAYDAY 2"
      },
      "supported_languages": "English<strong>*</strong>, German, French, Italian, Spanish - Spain, Dutch, Russian<br><strong>*</strong>languages with full audio support",
      "header_image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/358150/header.jpg?t=1727961605",
      "capsule_image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/358150/capsule_231x87.jpg?t=1727961605",
      "capsule_imagev5": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/358150/capsule_184x69.jpg?t=1727961605",
      "website": "https://www.paydaythegame.com/payday2/updates/bbq/",
      "pc_requirements": {
        "minimum": "<strong>Minimum:</strong><br><ul class=\"bb_ul\"><li><strong>OS *:</strong>Windows XP SP3<br>\t</li><li><strong>Processor:</strong>2 GHz Intel Dual Core Processor<br>\t</li><li><strong>Memory:</strong>2 GB RAM<br>\t</li><li><strong>Graphics:</strong>NVIDIA GeForce 8800/ATI Radeon HD 2600 (256MB minimum)<br>\t</li><li><strong>DirectX®:</strong>9.0c<br>\t</li><li><strong>Hard Drive:</strong>13 GB HD space <br>\t</li><li><strong>Sound:</strong>DirectX 9.0c compatible</li></ul>",
        "recommended": "<strong>Recommended:</strong><br><ul class=\"bb_ul\"><li><strong>OS *:</strong>Windows XP SP3/Vista/Windows 7<br>\t</li><li><strong>Processor:</strong>2.3 GHz Intel Quad Core Processor<br>\t</li><li><strong>Memory:</strong>3 GB RAM<br>\t</li><li><strong>Graphics:</strong>NVIDIA GeForce GTX460/ATI Radeon HD 5850 (512MB minimum)<br>\t</li><li><strong>DirectX®:</strong>9.0c<br>\t</li><li><strong>Hard Drive:</strong>13 GB HD space<br>\t</li><li><strong>Sound:</strong>DirectX 9.0c compatible</li></ul>"
      },
      "mac_requirements": [],
      "linux_requirements": {
        "minimum": "<strong>Minimum:</strong><br><ul class=\"bb_ul\"><li><strong>OS:</strong>Windows XP SP3<br>\t</li><li><strong>Processor:</strong>2 GHz Intel Dual Core Processor<br>\t</li><li><strong>Memory:</strong>2 GB RAM<br>\t</li><li><strong>Graphics:</strong>NVIDIA GeForce 8800/ATI Radeon HD 2600 (256MB minimum)<br>\t</li><li><strong>DirectX®:</strong>9.0c<br>\t</li><li><strong>Hard Drive:</strong>13 GB HD space <br>\t</li><li><strong>Sound:</strong>DirectX 9.0c compatible</li></ul>",
        "recommended": "<strong>Recommended:</strong><br><ul class=\"bb_ul\"><li><strong>OS:</strong>Windows XP SP3/Vista/Windows 7<br>\t</li><li><strong>Processor:</strong>2.3 GHz Intel Quad Core Processor<br>\t</li><li><strong>Memory:</strong>3 GB RAM<br>\t</li><li><strong>Graphics:</strong>NVIDIA GeForce GTX460/ATI Radeon HD 5850 (512MB minimum)<br>\t</li><li><strong>DirectX®:</strong>9.0c<br>\t</li><li><strong>Hard Drive:</strong>13 GB HD space<br>\t</li><li><strong>Sound:</strong>DirectX 9.0c compatible</li></ul>"
      },
      "legal_notice": "\"PAYDAY 2 ®” and \"OVERKILL A STARBREEZE STUDIO®\" are registered trademarks of New Starbreeze Publishing AB  and/or its affiliated companies in the United States and other countries.<br />\r\nAll other trademarks are properties of their respective owners. All rights reserved.  <br />\r\n<br />\r\n©2024 New Starbreeze Publishing AB  <br />\r\nALL RIGHTS RESERVED",
      "developers": [
        "Lion Game Lion",
        "OVERKILL - a Starbreeze Studio."
      ],
      "publishers": [
        "Starbreeze Publishing AB"
      ],
      "price_overview": {
        "currency": "USD",
        "initial": 199,
        "final": 199,
        "discount_percent": 0,
        "initial_formatted": "",
        "final_formatted": "$1.99"
      },
      "packages": [
        63582
      ],
      "package_groups": [
        {
          "name": "default",
          "title": "Buy PAYDAY 2: The Butcher's BBQ Pack",
          "description": "",
          "selection_text": "Select a purchase option",
          "save_text": "",
          "display_type": 0,
          "is_recurring_subscription": "false",
          "subs": [
            {
              "packageid": 63582,
              "percent_savings_text": " ",
              "percent_savings": 0,
              "option_text": "PAYDAY 2: The Butcher's BBQ Pack - $1.99",
              "option_description": "",
              "can_get_free_license": "0",
              "is_free_license": false,
              "price_in_cents_with_discount": 199
            }
          ]
        }
      ],
      "platforms": {
        "windows": true,
        "mac": false,
        "linux": true
      },
      "categories": [
        {
          "id": 2,
          "description": "Single-player"
        },
        {
          "id": 1,
          "description": "Multi-player"
        },
        {
          "id": 9,
          "description": "Co-op"
        },
        {
          "id": 38,
          "description": "Online Co-op"
        },
        {
          "id": 21,
          "description": "Downloadable Content"
        },
        {
          "id": 22,
          "description": "Steam Achievements"
        },
        {
          "id": 28,
          "description": "Full controller support"
        },
        {
          "id": 29,
          "description": "Steam Trading Cards"
        },
        {
          "id": 62,
          "description": "Family Sharing"
        }
      ],
      "genres": [
        {
          "id": "1",
          "description": "Action"
        },
        {
          "id": "3",
          "description": "RPG"
        }
      ],
      "screenshots": [
        {
          "id": 0,
          "path_thumbnail": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/358150/ss_e68b0262c52cad787a3141a4b3af96aee6956471.600x338.jpg?t=1727961605",
          "path_full": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/358150/ss_e68b0262c52cad787a3141a4b3af96aee6956471.1920x1080.jpg?t=1727961605"
        },
        {
          "id": 1,
          "path_thumbnail": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/358150/ss_ed5f32826a446c46331e540893ee4bf3baafc0be.600x338.jpg?t=1727961605",
          "path_full": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/358150/ss_ed5f32826a446c46331e540893ee4bf3baafc0be.1920x1080.jpg?t=1727961605"
        },
        {
          "id": 2,
          "path_thumbnail": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/358150/ss_70ca51fc546d177c109ec2fe8df813948cbae3cc.600x338.jpg?t=1727961605",
          "path_full": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/358150/ss_70ca51fc546d177c109ec2fe8df813948cbae3cc.1920x1080.jpg?t=1727961605"
        },
        {
          "id": 3,
          "path_thumbnail": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/358150/ss_00a59169c7ff27057877c390d8e20142623fa67a.600x338.jpg?t=1727961605",
          "path_full": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/358150/ss_00a59169c7ff27057877c390d8e20142623fa67a.1920x1080.jpg?t=1727961605"
        },
        {
          "id": 4,
          "path_thumbnail": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/358150/ss_d33b1a5ab3496a13d52168a80d82eed6031b10d7.600x338.jpg?t=1727961605",
          "path_full": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/358150/ss_d33b1a5ab3496a13d52168a80d82eed6031b10d7.1920x1080.jpg?t=1727961605"
        },
        {
          "id": 5,
          "path_thumbnail": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/358150/ss_2588d3f61ced84100be2cafec69d464dae15d353.600x338.jpg?t=1727961605",
          "path_full": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/358150/ss_2588d3f61ced84100be2cafec69d464dae15d353.1920x1080.jpg?t=1727961605"
        },
        {
          "id": 6,
          "path_thumbnail": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/358150/ss_73a9e82bdd14bb10ddb4cc8823ade9638c3cc373.600x338.jpg?t=1727961605",
          "path_full": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/358150/ss_73a9e82bdd14bb10ddb4cc8823ade9638c3cc373.1920x1080.jpg?t=1727961605"
        }
      ],
      "movies": [
        {
          "id": 2038104,
          "name": "PAYDAY 2: The Butcher's BBQ Pack Trailer",
          "thumbnail": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2038104/movie.293x165.jpg?t=1447371770",
          "webm": {
            "480": "http://video.akamai.steamstatic.com/store_trailers/2038104/movie480.webm?t=1447371770",
            "max": "http://video.akamai.steamstatic.com/store_trailers/2038104/movie_max.webm?t=1447371770"
          },
          "mp4": {
            "480": "http://video.akamai.steamstatic.com/store_trailers/2038104/movie480.mp4?t=1447371770",
            "max": "http://video.akamai.steamstatic.com/store_trailers/2038104/movie_max.mp4?t=1447371770"
          },
          "highlight": true
        }
      ],
      "recommendations": {
        "total": 1157
      },
      "release_date": {
        "coming_soon": false,
        "date": "Mar 26, 2015"
      },
      "support_info": {
        "url": "https://www.paydaythegame.com/support/#payday2-pc",
        "email": ""
      },
      "background": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/358150/page_bg_generated_v6b.jpg?t=1727961605",
      "background_raw": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/358150/page_bg_generated.jpg?t=1727961605",
      "content_descriptors": {
        "ids": [],
        "notes": null
      },
      "ratings": {
        "esrb": {
          "rating": "m",
          "use_age_gate": "true",
          "required_age": "18"
        },
        "pegi": {
          "rating": "18",
          "use_age_gate": "true",
          "required_age": "18"
        },
        "bbfc": {
          "rating": "18",
          "use_age_gate": "true",
          "required_age": "18"
        },
        "usk": {
          "rating": "18",
          "use_age_gate": "true",
          "required_age": "18"
        },
        "oflc": {
          "rating": "r18",
          "use_age_gate": "true",
          "required_age": "18"
        },
        "nzoflc": {
          "rating": "r18",
          "use_age_gate": "true",
          "required_age": "18"
        },
        "dejus": {
          "rating": "18",
          "use_age_gate": "true",
          "required_age": "18"
        },
        "mda": {
          "rating": "M18",
          "use_age_gate": "true",
          "required_age": "18"
        },
        "fpb": {
          "rating": "18",
          "use_age_gate": "true",
          "required_age": "18"
        },
        "csrr": {
          "rating": "R",
          "use_age_gate": "true",
          "required_age": "18"
        },
        "crl": {
          "rating": "18",
          "use_age_gate": "true",
          "required_age": "18"
        }
      }
    }
  }
]
```

Fields of the data:

| Field name | Description                                                                                                                                                                                                                    | Data Source                                                  |
|------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------|
| **appid**  | The id of an app/game.                                                                                                                                                                                                         | The same with [Fetch Steam app list](#Fetch-Steam-app-list). |
| **name**   | The name of this app/game.                                                                                                                                                                                                     | The same with [Fetch Steam app list](#Fetch-Steam-app-list). |
| **detail** | The info of this app/game from Steam Store. There's no doc of this information. **It can only be guessed by yourself.** For example, 'pc_requirements' probably means the device requirements to run this app/game on Windows. | [Steam Store API](#Steam-Store-API).                         |


> **Why some apps have no detail:** See [Failed to find app ID](#Failed-to-find-app-ID).

### Fetch city list.

```sh
npm run city
```

The data will be saved in `./data/city.json`.

The data structure of `appList.json` may be like:
```json
[
  {
    "countrycode": "US",
    "hasstates": 1,
    "countryname": "United States",
    "states": [
      {
        "countrycode": "US",
        "statecode": "AK",
        "statename": "Alaska",
        "cities": [
          {
            "countrycode": "US",
            "statecode": "AK",
            "cityid": 59,
            "cityname": "Anchorage"
          },
          {
            "countrycode": "US",
            "statecode": "AK",
            "cityid": 60,
            "cityname": "Barrow"
          }
        ]
      }
    ]
  }
]
```

> Note that not all countries have states/provinces.

Fields of the data:

| Field name | Description                | Data Source                                  |
|------------|----------------------------|----------------------------------------------|
| **appid**  | The id of an app/game.     | [Steam Community API](#Steam-Community-API). |
| **name**   | The name of this app/game. | [Steam Community API](#Steam-Community-API). |

You will find some apps' name are `""`, or like `"test2"`.
Usually, you can not find the game detail page in Steam Store.
I guess these apps were created by Steam or publishers for testing purpose.

### Fetch all comments for all games.
TODO

## Data source
This script will only fetch data from Steam Network directly.
But Steam has 3 different kind of apis I can find that with different structures.

### Steam Web API
[Steam Web API](https://developer.valvesoftware.com/wiki/Steam_Web_API) is the official apis provided by Valve Corporation. 
It includes almost all apis, but no game detail, featured games, game comments.

You can also search the apis in this 3-party website: https://steamapi.xpaw.me

The request url be like: `https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1?appid=2533680`


### Steam Store API
The apis requested on Steam store pages.
They are not official open apis, so there's no doc of these apis.
It includes game detail, featured games apis.

The request url be like: `https://store.steampowered.com/api/appdetails?appids=1473740`

### Steam Community API
The apis requested on Steam community pages.
They are not official open apis, so there's no doc of these apis.
It includes game comments, location list.

The request url be like: `https://steamcommunity.com/actions/QueryLocations/US/FL`


## Frequent errors
### Failed to find app ID
There are some app IDs that somehow can not get details from Steam Store API.
One possible reason is they have been offline.
You can ignore this error if you don't care about these apps/games.

### Too Many Requests
It often occurs when you are fetching from Steam Store API.
If you send http requests too frequently, it will return status code 429(Too Many Requests).
Waiting for a second, it will continue fetching automatically.
