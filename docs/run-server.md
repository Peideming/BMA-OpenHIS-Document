# BMS-OpenHIS-Server 快速部署 🚀

## 🌐 运行环境总览
### 推荐环境（生产级）
- **Ubuntu操作系统（推荐）**：Ubuntu Server 22.04/24.04 LTS（LTS版本更稳定）
- **Windows操作系统（次要选择）**：Windows Server 2016 + （早于2016版本可能会出现Python3.9+安装失败的问题）
- **CentOS操作系统（不推荐）**：CentOS8(不推荐,因为CentOS已全面停止官方维护)
- **容器化**：Docker 24.0+ + Docker Compose v2.0+
- **数据库**：MySQL 8.0（或MariaDB 10.6+）
- **Linux应用服务器**：Gunicorn 21.0+（配合Nginx反向代理）
- **Windows应用服务器**：wfastcgi（Microsoft推荐，更加易于配合IIS反向代理）
- **Python环境**：Python 3.9（Django 4.2+兼容）

### 兼容环境
| 组件         | Windows Server支持 | CentOS/RHEL支持 | 备注                          |
|--------------|-------------------|-----------------|-------------------------------|
| **Git**      | ✅ 全功能          | ✅ 全功能        | 建议使用Git Bash               |
| **Docker**   | ✅ 企业版          | ✅ 社区版        | Windows需启用WSL2或Hyper-V    |
| **IIS部署**  | ✅（仅Windows）    | ❌ 不支持        | 使用wfastcgi（见下文）         |
| **Supervisor**| ❌ 不支持          | ✅ 推荐          | Windows可用PM2替代             |

---

## 📥 项目获取与版本控制
### 🔧 Git基础（跨平台）
#### 安装方式
```bash
# Ubuntu/Debian
sudo apt update && sudo apt install git -y

# CentOS/RHEL
sudo yum install epel-release -y && sudo yum install git -y

# Windows Server
# 通过 [Git for Windows](https://git-scm.com/download/win) 安装，勾选：
# - Git Bash Here
# - Use Unix line endings（推荐跨平台协作）
```

#### 项目克隆
```bash
# 推荐HTTPS方式（无需SSH密钥）
git clone https://gitee.com/BlueMedAccess/bmsopenhisserver.git
cd bmsopenhisserver
```

---

## ⚙️ 环境准备（分平台指南）
### 🐳 Docker容器化部署（推荐）
#### 1. Docker安装
```bash
# Ubuntu/CentOS通用
curl -fsSL https://get.docker.com | sh
sudo systemctl enable --now docker

# Windows Server
# 通过 [Docker EE](https://docs.docker.com/ee/docker-ee/windows/docker-ee/) 安装
```

#### 2. Docker Compose配置
```yaml
# docker-compose.yml 示例
version: '3.8'

services:
  web:
    image: python:3.9-slim
    working_dir: /app
    volumes:
      - .:/app
    command: >
      sh -c "pip install -r requirements.txt &&
             gunicorn --bind 0.0.0.0:8000 config.wsgi"
    environment:
      - DB_HOST=mysql
      - DB_USER=his_admin
      - DB_PASSWORD=SecurePass123!

  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: RootSecurePass123!
      MYSQL_DATABASE: his_clinic
    volumes:
      - mysql_data:/var/lib/mysql

volumes:
  mysql_data:
```

### 💻 传统部署（非Docker）
#### Ubuntu/CentOS环境
```bash
# 1. 安装系统依赖
sudo apt install python3-venv python3-dev libmysqlclient-dev nginx  # Ubuntu
sudo yum install python3 python3-devel mysql-devel nginx              # CentOS

# 2. 创建虚拟环境
python3 -m venv his-venv
source his-venv/bin/activate
pip install -r requirements.txt
```

#### Windows Server环境
1. **安装Python**：从[Python官网](https://www.python.org/downloads/windows/)下载3.9版本，勾选：
   - `Add Python to PATH`
   - `Install launcher for all users`

2. **安装IIS支持**：
   - 通过服务器管理器添加角色：`Web Server (IIS)` → `Application Request Routing Cache` → `CGI`
   - 安装[wfastcgi](https://pypi.org/project/wfastcgi/)：
     ```powershell
     pip install wfastcgi
     wfastcgi-enable
     ```

---

## 🔧 核心配置说明
### `settings.py` 关键参数
```python
# 安全配置（必须修改）
ALLOWED_HOSTS = ['your-domain.com', '192.168.1.100']  # 生产环境需明确指定
DEBUG = False  # 生产环境必须为False
SECRET_KEY = 'your-generated-secret-key'  # 需替换为随机字符串

# 数据库配置（MySQL示例）
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'his_clinic',
        'USER': 'his_admin',
        'PASSWORD': os.getenv('DB_PASSWORD', 'default_password'),  # 推荐使用环境变量
        'HOST': os.getenv('DB_HOST', 'localhost'),
        'PORT': '3306',
        'OPTIONS': {
            'charset': 'utf8mb4',
            'init_command': "SET sql_mode='STRICT_TRANS_TABLES'"
        }
    }
}

# 静态文件配置
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
```

### 环境变量管理（推荐）
创建 `.env` 文件（需添加到 `.gitignore`）：
```ini
DB_HOST=mysql
DB_USER=his_admin
DB_PASSWORD=SecurePass123!
DEBUG=0  # 0表示False
```

---

## 🚀 服务启动方案
### 🐳 Docker方式
```bash
# 首次启动
docker compose up -d

# 查看日志
docker compose logs -f web
```

### 🏭 传统Gunicorn+Nginx（Ubuntu示例）
1. **启动Gunicorn**：
```bash
gunicorn --bind 127.0.0.1:8000 config.wsgi \
  --workers 4 \
  --timeout 120 \
  --access-logfile /var/log/gunicorn_access.log \
  --error-logfile /var/log/gunicorn_error.log
```

2. **Nginx配置示例**：
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location /static/ {
        alias /path/to/bmsopenhisserver/staticfiles/;
    }

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### 🪟 Windows Server (IIS+wfastcgi)
1. 配置IIS网站指向项目目录
2. 在 `web.config` 中添加：
```xml
<configuration>
  <system.webServer>
    <handlers>
      <add name="Python FastCGI" 
           path="*" 
           verb="*" 
           modules="FastCgiModule" 
           scriptProcessor="C:\Python39\python.exe|C:\Python39\Lib\site-packages\wfastcgi.py" 
           resourceType="Unspecified" />
    </handlers>
  </system.webServer>
</configuration>
```

---

## 📌 关键注意事项
1. **安全硬性要求**：
   - 必须启用HTTPS（使用Let's Encrypt免费证书）
   - 数据库密码需包含大小写字母+数字+特殊字符
   - 定期执行 `python manage.py check --deploy` 检查安全配置

2. **备份策略**：
   ```bash
   # 数据库备份（每日凌晨执行）
   0 3 * * * mysqldump -u his_admin -p'SecurePass123!' his_clinic | gzip > /backups/his_$(date +\%Y\%m\%d).sql.gz
   ```

3. **性能监控**：
   - 推荐使用 `htop`（Linux）或 `Task Manager`（Windows）监控进程
   - 关键指标：Gunicorn worker利用率、MySQL连接数

---

## 🆘 故障排查指南
| 现象 | 可能原因 | 解决方案 |
|------|---------|---------|
| 502 Bad Gateway | Gunicorn未运行 | 检查 `ps aux | grep gunicorn` |
| 数据库连接失败 | 密码错误/网络不通 | 验证 `telnet mysql_host 3306` |
| 静态文件404 | Nginx配置错误 | 确认 `STATIC_ROOT` 路径正确 |
| 部署后页面空白 | DEBUG=True未关闭 | 检查 `settings.py` 并重启服务 |

> 💡 **提示**：完整日志查看命令：
> - Docker: `docker compose logs --tail=100 web`
> - Systemd: `journalctl -u his_server -n 50 --no-pager`

---

此版本手册特点：
1. **分层架构**：将推荐方案（Docker）放在首位，传统方案作为备选
2. **可视化引导**：通过表格对比不同平台支持情况
3. **安全前置**：在环境准备阶段即强调安全配置
4. **运维友好**：提供完整的监控和备份方案
5. **跨平台兼容**：明确标注各组件在不同系统的支持状态

建议根据实际部署环境选择对应章节，生产环境强烈推荐使用Docker方案以获得最佳隔离性和可移植性。