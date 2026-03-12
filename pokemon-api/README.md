# Pokemon API

โปรเจกต์นี้เป็น API สำหรับจัดการข้อมูล Pokemon พัฒนาด้วย **NestJS** และมีการเชื่อมต่อฐานข้อมูลโดยใช้ **PostgreSQL** ผ่าน **TypeORM**

## 📋 สิ่งที่ต้องติดตั้งล่วงหน้า (Prerequisites)

- [Node.js](https://nodejs.org/) (เวอร์ชัน 20 หรือสูงกว่า แนะนำเวอร์ชัน LTS)
- [PostgreSQL](https://www.postgresql.org/) (สำหรับฐานข้อมูล)
- Docker (ทางเลือก หากต้องการรันผ่าน Docker)

## ⚙️ ตัวแปรสภาพแวดล้อม (Environment Variables)

ก่อนรันโปรเจกต์ คุณจำเป็นต้องตั้งค่าตัวแปรสภาพแวดล้อม (Environment Variables) โดยสร้างไฟล์ชื่อ `.env` ไว้ในโฟลเดอร์หลักของโปรเจกต์ (ระดับเดียวกับ `package.json`) และกำหนดค่าตัวแปรดังนี้:

```env
# ตั้งค่าสำหรับการเชื่อมต่อฐานข้อมูล PostgreSQL
POSTGRES_HOST=127.0.0.1          # Host ของฐานข้อมูล
POSTGRES_PORT=5432               # Port ของ PostgreSQL (ค่าเริ่มต้นคือ 5432)
POSTGRES_USER=postgres           # ชื่อผู้ใช้งานฐานข้อมูล
POSTGRES_PASSWORD=your_password  # รหัสผ่านของฐานข้อมูล
POSTGRES_DATABASE=pokemon_db     # ชื่อฐานข้อมูลที่ใช้งาน

# ตั้งค่าสำหรับ JWT (JSON Web Token)
JWT_SECRET=your_secret_key       # คีย์ลับสำหรับเซ็น JWT
```

*(หมายเหตุ: นำโค้ดด้านบนไปวางในไฟล์ `.env` และเปลี่ยนค่า `POSTGRES_PASSWORD` กับ `JWT_SECRET` ให้ตรงกับการตั้งค่าของคุณ)*

## 🚀 วิธีการรันโปรเจกต์ (How to run)

### แทรกฐานข้อมูล (Database Setup)
ต้องแน่ใจว่าได้จำลองหรือติดตั้ง PostgreSQL ไว้ที่เครื่องของคุณ และได้สร้างฐานข้อมูลชื่อ `pokemon_db` เรียบร้อยแล้ว

### การรันบนเครื่องแบบปกติ (Local Development)

1. **ติดตั้ง Dependencies**
   เปิด Terminal ในโฟลเดอร์โปรเจกต์และรันคำสั่ง:
   ```bash
   npm install
   ```

2. **รันโปรเจกต์แบบโหมด Development**
   ```bash
   npm run start:dev
   ```
   > ตอนนี้เซิร์ฟเวอร์จะรันอยู่ที่ `http://localhost:3000` (หากไม่ได้แก้พอร์ตในโค้ดเพิ่มเติม)

3. **รันบนโหมด Production**
   รันคำสั่ง Build เพื่อคอมไพล์โค้ดเป็น JavaScript ก่อน จากนั้นสั่งรัน:
   ```bash
   npm run build
   npm run start:prod
   ```

### การรันผ่าน Docker

โปรเจกต์นี้รองรับการ Build ผ่าน Docker ได้ โดยมี `Dockerfile` เตรียมไว้ให้แล้ว:

1. **Build Docker Image**
   ```bash
   docker build -t pokemon-api .
   ```

2. **Run Docker Container**
   ```bash
   # ควรตรียมไฟล์ `.env` ไว้ก่อนเพื่อให้ Docker อ้างอิงตัวแปรสภาพแวดล้อมได้
   docker run -p 3000:3000 --env-file .env pokemon-api
   ```

## 🧪 การทดสอบ (Testing)

โปรเจกต์รองรับการทดสอบด้วย Jest สามารถรันได้ดังนี้:

- Unit tests: `npm run test`
- e2e tests: `npm run test:e2e`
- Test coverage: `npm run test:cov`
