# 餐廳清單

## 功能
* 使用者可以在首頁快速瀏覽餐廳資料，包含:  
  1. 餐廳名稱  
  2. 餐廳類型  
  3. 餐廳評價  
  4. 餐廳照片  
* 使用者可以點擊餐廳卡片查看詳細資訊，包含:  
  1. 餐廳類別  
  2. 餐廳地址  
  3. 餐廳電話  
  4. 餐廳描述  
* 使用者可以透過搜尋餐廳名稱來找到特定的餐廳  
* 使用者可以透過搜尋餐廳類別來找到特定的餐廳  
* 可以註冊使用者
* 可以新增、修改、刪除餐廳資料
* 可以使用facebook登入

## 需求
* node.js: v14.17.6
* express: v4.17.1
* express-handlebars: v5.3.3

## 安裝方法
* 執行Terminal，透過npm安裝restaurant_list
* 下載專案  
```
  git clone https://github.com/azod2/restaurant_list
```
* 安裝
```
cd restaurant_list
npm install
```

```
將.env.example改成.env，並將以下改成您的內容
FACEBOOK_ID = 'YOUR ID'
FACEBOOK_SECRET = 'YOUR SECRET'
```

*執行種子資料
```
npm run seed
```

* 執行
```
npm run dev
```
* 在瀏覽器輸入網址
```
http://localhost:3000
```
