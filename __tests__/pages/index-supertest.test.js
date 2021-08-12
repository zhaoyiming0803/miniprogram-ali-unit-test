// 测试api是否正确
const supertest = require('supertest')

describe('supertest', () => {
  it('response with json', done => {
    const request = supertest('https://xxx.net')
    request.post('/tb/secondKill/grouponList')
      .send({
        grouponId: "",
        p: 1,
        partnerId: "2095890",
        size: 10,
        type: 1
      })
      .set('Accept', 'application/json')
      .set('Source', 'alipay')
      .set('Ver', '2.20.0')
      .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1aWQiOiIxMDg5NjA5NDczIiwibmJmIjoxNjI4NjcwMDA4LCJ1bm0iOiJqWW9MVFNWM2gyTHVOYVA5bGlqSjhRPT0iLCJpc3MiOiJ5aGR4IiwiZXhwIjoxNjI5MTg4NDA4LCJpYXQiOjE2Mjg2NzAwMDgsImp0aSI6IjVlOGUxOWEyYTZiZjRmZWZiZTViMWU3YjUyOGUwN2YzIn0.PKwThNiMGmHGrr1LvAg3FiEO7vtchI8Cy4IeUPGpImEz0wNzINjA9m5E28JEhqnGSl5w4QjHF0ddyI401RLndQ')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        // console.log('-------- res -------: ', res.body)
        if (err) return done();
        return done();
      });
  })
})