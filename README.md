# 蘭州國中社團分配

### [DEMO](https://lcjh-associations.herokuapp.com/)

### 系統需求
  國中生要選社團的時候, 因為熱門社團慧滿, 希望有比較公正的方法將沒選到的人按照志願序進行隨機分配.  
  並且提供一個簡單的CRUD頁面讓系統管理人能夠針對社團的部分進行修改
  
### 系統流程 ###
  1. 使用者進入系統後, 可以透過右邊的nav bar 進行導覽
  2. 先進行社團的修改
  3. 上傳學生社團志願表(xlsx)
  4. 下載分配完成志願表/未滿員社團清單

### 系統功能  
  主要的功能有:
  - 社團清單的CRUD
  - 上傳xlsx到nodejs進行分析
  - 依照志願分配選得社團
  - 產生xlsx供使用者下載(Client side)

## TODO
 - maybe a login require, but not nessery
 - form validation
 
### 應用技術
* React
* React-dom
* React Tree Menu
* React scroll
* JSON obj to CSV/XLSX
* gulp 
* bootstrap css
* nodejs
* Express
* MongoDB, MongoLab
* heroku to cloud deploy
* a little jquery

### 心得
1. 這是第一個單頁式網站, 以前用JQ可以達到的換頁特效在 React 真的會搞死人
2. 換頁的部分用 React scroll 來做, 稍微看了一下src還是有用到一點JQ, 跟我原先想要的用React Animation有點差距, 但就免強用一下吧...
3. 第一次使用google font, 好看是好看, 但是載入實在太久了...  
4. 載入的問題還發生在背景圖片, 目前設計眼的培養仍然是處於悲劇的狀態, 用了全版背景圖之後載入更慢, 即使壓縮在轉base64 encode還是很慢...
5. 社團演算法的部分還算直覺好想, 但不知道當列表人數暴增的時候處理效率如何
6. **[heroku don't share a file system](https://devcenter.heroku.com/articles/how-heroku-works)**, so I can't create a file on the heroku server for the result and let user download it. I replace it to response a json and create a xlsx file on client.

### More to do
* 導入Redux Handle statet, action, and make more clean project.
* use webpack package all the script, and minify the code.
* sass maybe?

**Feel free to ask me anything about this project and feedback is always welcome.**


