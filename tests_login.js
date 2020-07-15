var expect = chai.expect
var assert = chai.assert

setTimeout(() => {
	if (config.launch_automatically) {
		mocha.run()
	}
}, 1000)

const tester = new Tester()
describe(`3 ქულა. ავტორიზაცია`, () => {
   // it.skip(``, () => {})
   describe(`საწყისი კოდი`, () => {
      it(`ავტორიზაციის გვერდზე არსებობს users ბაზა, რომელიც შენახულია ცვლადში users`, () => {
        expect(users.collectionName).equal('users')
      })
      it(`გვერდზე არსებობს input ელემენტი, რომლის id არის 
        ${testConfig.usernameInput}. ელემენტის type არის ${testConfig.usernameInputType}`, () => {
         expect(getInput(testConfig.usernameInput).type).equals(testConfig.usernameInputType)
      })
      it(`გვერდზე არსებობს input ელემენტი, რომლის id არის 
        ${testConfig.passwordInput}. ელემენტის type არის ${testConfig.passwordInputType}`, () => {
         expect(getInput(testConfig.passwordInput).type).equals(testConfig.passwordInputType)
      })
      it(`გვერდზე არსებობს ღილაკი, რომლის id არის 
        ${testConfig.loginButton}.`, () => {
         assert.isNotNull(getButton(testConfig.loginButton))
      })
      it.skip(`${testConfig.loginButton} ღილაკზე დაჭერის კოდი გაკეთებული გვაქვს სემინარზე.
        პროექტში არ არის საჭირო ფანჯრის ლოკაციის კოდში რამის შეცვლა`)
   })

   describe(`ux დამატებები`, () => {
      it(`საიტზე არსებობს div ელემენტი, რომლის id არის ${testConfig.errorMessage} 
         და თავიდან ცარიელია`, () => {
          const elem = document.getElementById(testConfig.errorMessage)
          assert.isNotNull(elem)
          expect(elem.innerText).eql('')
      })
      it(`1 ქულა. თუ მომხმარებლის შეყვანილი პაროლი არ არის სწორი, ${testConfig.errorMessage}
        ელემენტში უნდა დაეწეროს ტექსტი '${testConfig.wrongPassword}'`, () => {
          const user = tester.createUser()
          user.password = 'wrongPassword'
          return tester.login(user).then(() => {
            const elemContent = document.getElementById(testConfig.errorMessage).innerText
            expect(elemContent).eql(testConfig.wrongPassword)
          })
      })
      it(`2 ქულა. თუ მომხმარებლის შეყვანილი username არ არსებობს, ${testConfig.errorMessage}
        ელემენტში უნდა დაეწეროს ტექსტი ${testConfig.noUserFound}`, () => {
          const user = tester.createUser()
          users.clear()
          return tester.login(user).then(() => {
            const elemContent = document.getElementById(testConfig.errorMessage).innerText
            expect(elemContent).eql(testConfig.noUserFound)
          })
      })
   })

   it.skip(`რეგისტრაციასთან დაკავშირებული ტესტები არის register.html გვერდზე `)
})
