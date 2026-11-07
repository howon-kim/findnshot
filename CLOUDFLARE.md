# Cloudflare Pages 배포

별도 빌드가 없는 HTML/CSS/JavaScript 사이트입니다. `dist/`에 배포할 파일과 그림이 모두 들어 있습니다.

## GitHub 연결

1. Cloudflare 대시보드에서 **Workers & Pages → Create application → Pages → Import an existing Git repository**를 선택합니다.
2. GitHub의 **howon-kim/findnshot** 저장소를 연결합니다.
3. 아래 설정을 입력하고 **Save and Deploy**를 선택합니다.

| 설정 | 값 |
| --- | --- |
| 프로젝트 이름 | `findnshot` |
| Production branch | `main` |
| Framework preset | `None` |
| Root directory | 저장소 루트 — 비워 두기 |
| Build command | `exit 0` |
| Build output directory | `dist` |
| 환경변수 | 없음 |

`wrangler.toml`에도 프로젝트 이름과 배포 폴더를 지정했습니다. Pages 프로젝트 이름을 다르게 정하면 파일의 `name`도 같은 이름으로 바꿉니다. `main`에 변경사항을 올리면 연결된 Pages 프로젝트가 자동으로 다시 배포합니다.

2026-11-07에 GitHub 연결, Pages 프로젝트 생성과 최초 배포를 완료했습니다.

- 운영 주소: [findnshot.pages.dev](https://findnshot.pages.dev/)
- GitHub 저장소: [howon-kim/findnshot](https://github.com/howon-kim/findnshot)
- `main` 브랜치의 새 커밋은 자동 배포됩니다.
- 실제 사이트의 그림 로딩, 70개 사물 영역, 촬영 수집과 얼굴 검열 효과를 확인했습니다.
- 사용자 도메인은 아직 연결하지 않았습니다.

## 로컬에서 보기

저장소 루트에서:

```sh
python3 -m http.server 4173 --directory dist
```

브라우저에서 `http://localhost:4173`을 엽니다. 런타임 의존성이나 설치 단계는 없습니다.

## 게시 후 확인

- 그림과 사물 이름이 나타나는지 확인합니다.
- 수집 개수는 사물만 증가하며, 얼굴에는 노이즈 효과만 나타납니다.
- 모바일 화면에서 그림을 밀어 탐색하고 사물을 선택합니다.
- About에서 향후 프로젝트 소개 문구가 삭제되어 있는지 확인합니다.

## 공식 문서

- [Static HTML 배포](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/)
- [Pages Wrangler 설정](https://developers.cloudflare.com/pages/functions/wrangler-configuration/)
