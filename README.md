## 💻 프로젝트 주제

- 대용량 트래픽, 데이터를 고려한 커머스 플랫폼 설계 + 주문, 포인트 적립/사용, 부분 환불 처리 로직 고도화


## 💡 주요 내용

### 적립금 부분 환불 기능 고도화 → 이슈 개선 방안 제시

- 아임웹 프로덕션 내 고객이 부분 환불 요청 시 적립금을 부분 반환 처리에 이슈 발견
- 데이터베이스 설계에 문제를 발견하고 해당 부분을 다대다 매핑 테이블 활용하여 재설계 및 트랜젝션 처리
    


### 데이터베이스 커넥션 제어 → 리소스 활용 효율 향상

- ORM 사용 시 발생하는 단점(쿼리 제어, 성능 저하 등)mysql 드라이버를 활용
- 커넥션 풀 사용, 커넥션 개수를 제한하여 리소스 고갈 방지


### 데이터베이스 이중화(읽기&쓰기 전용 분리) → DB 접근 부하 분산

- Master & Slave 구조를 사용, 쓰기 전용 DB(Master)와 읽기 전용 DB(Slave)를 별도로 두고, 용도에 맞게 사용함으로써 DB 접근 부하를 분산
    
    

### 레디스 Bull Queue → DB 접근 병목 방지

- Redis 위에 npm Bull로 메세지 큐를 구현하고, 주문 로직을 비동기 프로세스 처리
- DB에 동시 트래픽이 몰리지 않도록 대기열로 DB접근 쿼리를 제어
    

### 테스트 코드 작성

- jest를 이용하여 서비스, 컨트롤러 메서드 유닛 테스트 진행
- mock 함수 및 mock data 활용을 통해 테스트 로직의 의존성 분리
    

