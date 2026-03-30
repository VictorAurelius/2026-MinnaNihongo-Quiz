# Install / Update Starter Kit

## Dự án mới (chưa có kit)
```bash
git clone https://github.com/VictorAurelius/claude-starter-kit.git /tmp/kit && bash /tmp/kit/bin/init-project.sh .
```

## Dự án đã có kit (update)
```bash
git clone https://github.com/VictorAurelius/claude-starter-kit.git /tmp/kit && bash /tmp/kit/bin/install-remote.sh .
```

## Xem trước (không thay đổi gì)
```bash
git clone https://github.com/VictorAurelius/claude-starter-kit.git /tmp/kit && bash /tmp/kit/bin/upgrade-project.sh . --dry-run
```

## Sau cài đặt
Sửa `CLAUDE.md` — thay `{placeholders}` bằng thông tin dự án. Xem [GETTING-STARTED.md](docs/GETTING-STARTED.md).
