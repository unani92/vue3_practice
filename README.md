### 발란 채용과제

#### 1. 프로젝트 실행

- 해당 프로젝트는 vuetify cli 최신 버전을 사용해 생성했습니다.
- 프로젝트 최소 실행 조건으로서 노드 버전 20.15.0을 사용합니다. 해당 버전을 사용하기 위해 nvm을 사용해주세요.
```bash
// node version: 20.15.0

```bash
nvm install 20.15.0
nvm use 20.15.0
```

- 노드 버전이 부합한다는 전제 하에 프로젝트 실행 방법은 아래와 같습니다.
```bash
$ yarn install
$ yarn dev
```

### 2. 프로젝트 구조
- pages
  - 페이지에서 vue template 파일 생성 시 [자동으로 navigatable route로 변환](https://github.com/posva/unplugin-vue-router)이 이루어짐.
    - `src/typed-router.d.ts` 파일에 라우터 타입이 자동으로 생성됨
  - 페이지 구성
    - index.vue
      - 홈 페이지로 이메일, 비밀번호 입력 폼 구성
      - input 에 대한 validation 처리, validation fail 시 다음 페이지 이동 불가
      - submit 버튼 클릭 시 다음 페이지로 이동
      - 비밀번호 조건으로 영문 대문자, 소문자, 숫자, 특수문자를 **"모두"** 포함한 8자리 이상의 문자열로 인식하고 구현 진행 ex) Qkffks1!
    - delivery-info.vue
        - 이름, 연락처, 주소 입력 폼 구성
        - input 에 대한 validation 처리, validation fail 시 다음 페이지 이동 불가
        - 주소 입력 open api 적용(`<DaumPostCode />` 컴포넌트 사용)
          - 지식, 부모 컴포넌트의 `address` value를 양방향으로 바인딩해 주소 입력
    - payment-info.vue
      - `isValidCardNum` value를 통해 조건에 부합하는 번호인지 검증
      - 유효한 카드번호 입력 시에 다음 단계 이동 가능
      - 유효한 카드번호 예시 `['6011 7338 9510 6094', '2720 9927 1182 8767]`
    - submit-complete.vue
      - 전부 입력 완료 시 해당 페이지 이동 가능
      - 새로고침 시 홈으로 이동

- layouts
  - default.vue
    - 기본적인 반응형 레이아웃을 글로벌로 사용하기 위해 구현

- components
  - InputLabelDefault.vue
    - 과제 내에서 가장 많이 사용되는 input label을 공통컴포넌트화
    - label, child component(주로 v-text-field)를 props로 받아 사용
  - DaumPostCode.vue
    - 다음 우편번호 서비스를 사용하기 위한 컴포넌트
    - **컴포넌트 마운트 시** 우편번호 api 스크립트를 script tag를 추가
    - 상기한 바와 같이 컴포넌트 외부의 value와 동적 바인딩을 통해 주소 입력 구현
    
- plugins
  - vuetify.ts
    - vuetify 플러그인을 사용하기 위한 설정 파일
    - vuetify의 기본 설정을 불러와 사용
  - router
    - navigation guard 를 통해 페이지 이동 시 validation 처리
      - `src/router/index.ts` 파일에 `router.beforeEach`를 통해 validation 처리
      - 예를 들어 인적사항 페이지에서 정보 입력 하지 않은 채 배송정보 페이지 진입 시 인적사항 페이지로 이동
  - pinia
    - 상태관리 라이브러리로 사용
    - 구현해야 할 인적사항, 배송정보, 결제(카드) 정보 관련 state, setter 함수 구현

### 3. 주요 사용 라이브러리
`yarn create vuetify`를 사용해 프로젝트 생성시 만들어진 boilierplate 사용
- vuetify
  - 디자인을 쉽게 구현하기 위해 사용
  - `v-text-field`, `v-btn`, `v-form` 컴포넌트 사용
  - form text-field 를 통해 디자인과 validation 처리를 쉽게 구현
- vue-router, unpugin-vue-router
  - 페이지 이동을 위해 사용
  - pages 디렉터리 내에 파일 생성 시 자동으로 navigatable route로 변환, `src/typed-router.d.ts` 파일에 라우터 타입이 자동으로 생성됨
- pinia
  - 상태관리 라이브러리로 사용