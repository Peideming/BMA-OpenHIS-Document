# 🏥 BMS-OpenHIS-Server 项目配置文档 (`./HIS_BMA_V21/settings.py`)

## 📌 基础配置

### ⛺打开配置文件
```base
cd /bmsopenhisserver/HIS_BMA_V21/settings.py
```
### 🗂 项目路径
```python
BASE_DIR = Path(__file__).resolve().parent.parent
```
- **作用**：自动计算项目根目录路径，所有文件路径都基于此构建
- **小白理解**：就像你家的门牌号，告诉电脑在哪里能找到你的项目文件 

### 🔑 安全密钥
```python
SECRET_KEY = 'django-insecure-vf)1$of+ecsmd)4=dw&s7vpfxh+5qdd!ss)ua*!k+f23fj7non'
```
- **重要提示**：这个密钥就像你家大门的钥匙，**绝对不能泄露**！
- **生产环境建议**：
  - 从环境变量读取：`SECRET_KEY = os.environ['SECRET_KEY']`
  - 或从外部文件读取 

## ⚠️ 安全配置

### 🐞 调试模式
```python
DEBUG = True  # ❌ 上线前必须改为 False！
```
- **开发时**：`True`（显示详细错误信息，方便找bug）
- **上线后**：`False`（避免泄露敏感信息如数据库密码）

### 🌐 允许访问的域名
```python
ALLOWED_HOSTS = ['*']  # ❌ 不安全！
```
- **正确做法**：
  ```python
  ALLOWED_HOSTS = ['yourdomain.com', '192.168.1.100']
  ```
- **小白解释**：就像小区的门禁名单，只允许登记过的访客进入 

## 🛠 应用配置

### 📱 安装的应用
```python
INSTALLED_APPS = [
    'simpleui',  # 漂亮的后台界面
    'rest_framework',  # API开发工具包
    'login',  # 登录模块
    # ...其他应用
]
```
- **注意**：每新增一个应用（如`patientinf`），都要在这里注册 

### 🛡 中间件
```python
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',  # 安全防护
    'django.middleware.csrf.CsrfViewMiddleware',  # 防跨站攻击
    # ...其他中间件
]
```
- **作用**：像安检流程，每个请求都要经过这些检查 

## 💾 数据库配置

### 🗃 默认SQLite配置
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'his.sqlite3',
    }
}
```
- **适合**：小型项目/开发测试
- **优点**：无需安装额外软件 

### 🐬 MySQL配置示例
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'his_db',      # 数据库名
        'USER': 'admin',       # 用户名
        'PASSWORD': '123456',  # 密码
        'HOST': 'localhost',   # 数据库地址
        'PORT': '3306',       # 端口
    }
}
```
- **需要先安装**：`pip install mysqlclient` 

### 🐘 PostgreSQL配置示例
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'his_db',
        'USER': 'postgres',
        'PASSWORD': '123456',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```
- **需要先安装**：`pip install psycopg2` 

### 🔴最后还需要生成数据库同步文件并同步数据库
```
python manage.py makemigrations #生成数据库同步文件
python manage.py migrate        #同步数据库
```

## 🌍 国际化配置

### 🌐 语言与时区
```python
LANGUAGE_CODE = 'zh-hans'  # 简体中文
TIME_ZONE = 'Asia/Shanghai'  # 上海时区
USE_I18N = True  # 启用国际化
USE_TZ = True   # 使用时区
```
- **注意**：不要用`'Asia/Beijing'`，要用`'Asia/Shanghai'` 

### 多语言支持
```python
LANGUAGES = [
    ('en', 'English'),
    ('zh-hans', '简体中文'),
]
LOCALE_PATHS = [BASE_DIR / 'locale']  # 翻译文件存放目录
```
- **如何添加翻译**：
  1. 在`locale`目录创建`.po`文件
  2. 使用`django-admin makemessages`生成翻译文件 

## 📂 文件配置

### 🖼 静态文件
```python
STATIC_URL = 'static/'  # 访问前缀
STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static')]  # 存放目录
```
- **存放位置**：CSS、JS、图片等文件放在`static`文件夹

### 📁 媒体文件
```python
MEDIA_URL = '/media/'  # 访问前缀
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')  # 存放目录
```
- **用途**：存放用户上传的文件（如头像、病历等）

## ⚡ 服务器部署

### 🐧 Linux服务器 (Gunicorn + Nginx)
```bash
# 安装Gunicorn
pip install gunicorn

# 启动命令
gunicorn --bind 0.0.0.0:8000 HIS_BMA_V21.wsgi
```
- **Nginx配置**：需要设置反向代理和静态文件处理 

### 🪟 Windows服务器 (wfastcgi + IIS)
```bash
# 安装wfastcgi
pip install wfastcgi

# 启用wfastcgi
wfastcgi-enable
```
- **IIS配置**：需要添加FastCGI模块和URL重写规则 

## 🔐 高级安全配置

### 🔑 自定义用户模型
```python
AUTH_USER_MODEL = 'department.CustomUser'
```
- **作用**：使用自定义用户表替代Django默认用户表 

### 🔒 JWT认证配置
```python
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ]
}
```
- **用途**：API接口的Token认证方式 

## 💡 小贴士
1. **开发完成后**：一定要把`DEBUG = True`改为`DEBUG = False`
2. **数据库密码**：不要直接写在settings.py里，建议用环境变量
3. **定期备份**：特别是数据库和用户上传的文件
4. **更新依赖**：定期运行`pip install -U`更新所有包 

## 🆘 遇到问题怎么办？
1. 检查错误日志：`python manage.py runserver`会显示错误信息
2. 搜索错误信息：大部分问题都能在网上找到解决方案
3. 咨询社区：Django有活跃的中英文社区可以提供帮助,如果问题还未解决,请到Github/Gitee的仓库下提出Issue（记住，要标明Bug）或者到我们的论坛发送帖子http://luntan-bma.tttttttttt.top/public/t/UserTechnicalSupport