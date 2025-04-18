# 📚 G-Scores - THPT Score Analysis App

## 🎯 Giới thiệu

**G-Scores** là một ứng dụng web đơn giản được xây dựng để phân tích điểm thi THPT Quốc Gia năm 2024.

### 🎯 Mục tiêu của dự án:
- Chuyển đổi dữ liệu thô (CSV) thành cơ sở dữ liệu có cấu trúc.
- Hiển thị và báo cáo điểm số theo các mức phân loại.
- Tìm kiếm điểm theo số báo danh.
- Thống kê theo môn học và hiển thị biểu đồ.
- Danh sách top 10 học sinh khối A (Toán, Lý, Hóa).

---

## ⚙️ Công nghệ sử dụng

| Thành phần | Công nghệ |
|------------|-----------|
| **Backend** | Spring Boot, Hibernate/JPA (OOP-based) |
| **Frontend** | React (React Hooks, Vite) |
| **Database** | PostgreSQL |
| **Triển khai** | Docker, Docker Compose |
| **Migration & Seeding** | Flyway |
| **Biểu đồ** | Chart.js |

---

## 📂 Cấu trúc dự án

```bash
.
├── BE/                      # Backend xử lý điểm thi
│   ├── src/main/java/com/gscore/
│   │   ├── config/
│   │   ├── constants/
│   │   ├── controller/
│   │   ├── exception/
│   │   ├── handler/
│   │   ├── model/           # Entity: Student, Subject, Score. Request/Response DTO
│   │   ├── repository/
│   │   ├── service/
│   │   └── util/            # Tiện ích parse file CSV
│   ├── src/main/resources/
│   │   ├── application.properties
│   │   ├── data/
│   │   │   └── migration/
│   │   │       └── V1__create_scheme.sql
│   │   └── diem_thi_thpt_2024.csv
│
├── FE/                      # Giao diện người dùng React
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── layout/
│       ├── pages/
│       ├── redux/
│       ├── routes/
│       ├── styles/
│       ├── types/
│       ├── utils/
│       └── App.tsx
│
├── docker-compose.yml
├── README.md
## ✅ Tính năng đã hoàn thành

### ✅ MUST-HAVE

- ✅ Parse file `diem_thi_thpt_2024.csv` và lưu dữ liệu vào cơ sở dữ liệu thông qua Flyway (migration & seed).
- ✅ Tìm kiếm điểm theo **số báo danh**.
- ✅ Phân loại điểm theo 4 mức:
  - `>= 8`
  - `6 <= điểm < 8`
  - `4 <= điểm < 6`
  - `< 4`
- ✅ Thống kê số lượng học sinh theo từng mức điểm trên cho **từng môn học**.
- ✅ Hiển thị **biểu đồ** thống kê điểm số (Chart.js).
- ✅ Danh sách **Top 10 học sinh khối A (Toán - Lý - Hóa)** có điểm cao nhất. (có thể tuỳ chọn tổ hợp môn thi khác).

### 🌟 NICE-TO-HAVE

- ✅ Docker hóa toàn bộ hệ thống (backend + database).
- ✅ Triển khai **Frontend** lên Vercel và **Backend** lên Render.
- ✅ Kết nối với Supabase để quản lý dữ liệu PostgreSQL.

---

## 🚀 Triển khai ứng dụng

| Thành phần | Nền tảng | Đường dẫn |
|------------|----------|-----------|
| **Frontend** | Vercel | [https://g-scores-rkpm.vercel.app/](https://g-scores-rkpm.vercel.app/) |
| **Backend** | Render | [https://gscore-springboot-app-v1.onrender.com](https://gscore-springboot-app-v1.onrender.com) |
| **Database** | Supabase | *Dữ liệu CSV import vào PostgreSQL trên Supabase* |

---

## ⚠️ Ghi chú triển khai

- Vì dữ liệu gốc có **~700.000 dòng**, thời gian import và xử lý có thể lâu — do đó bản deploy chỉ import mẫu **vài trăm dòng** để demo nhanh.
- Khi sử dụng Docker, đảm bảo **Flyway SQL file** (bao gồm migration và seed) được **mount đúng** thư mục.
- Để phát triển nhanh, bạn có thể sử dụng sẵn file mẫu:  
  `src/main/resources/diem_thi_thpt_2024.csv` để import thủ công khi chạy local.



