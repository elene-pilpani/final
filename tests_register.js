var expect = chai.expect
var assert = chai.assert

setTimeout(() => {
	if (config.launch_automatically) {
		mocha.run()
	}
}, 1000)

const tester = new Tester()

describe(`12 ქულა. რეგისტრაცია`, () => {
   // it.skip(``, () => {})
   it.skip(`წარმატებული რეგისტრაცია ნიშნავს, რომ ახალი დარეგისტრირებული მომხმარებელი 
   	დაემატა users ბაზაში (და შესაძლებელია მისი მოძებნა).`, () => {})
   describe(`შესავალი მოთხოვნები`, () => {
   	it(`რეგისტრაციის გვერდზე არსებობს users ბაზა, რომელიც შენახულია ცვლადში users`, () => {
   		expect(users.collectionName).equal('users')
   	})
   })
   describe(`ელემენტები`, () => {
   	it(`0.5 ქულა. გვერდზე არსებობს input ელემენტი, რომლის id არის 
   		${testConfig.usernameInput}. ელემენტის type არის ${testConfig.usernameInputType}`, () => {
   			expect(getInput(testConfig.usernameInput).type).equals(testConfig.usernameInputType)
   		})
   	it(`0.5 ქულა. გვერდზე არსებობს input ელემენტი, რომლის id არის 
   		${testConfig.passwordInput}. ელემენტის type არის ${testConfig.passwordInputType}`, () => {
   			expect(getInput(testConfig.passwordInput).type).equals(testConfig.passwordInputType)
   		})
   	it(`0.5 ქულა. გვერდზე არსებობს input ელემენტი, რომლის id არის 
   		${testConfig.passwordRepeatInput}. ელემენტის type არის ${testConfig.passwordInputType}`, () => {
   			expect(getInput(testConfig.passwordRepeatInput).type).equals(testConfig.passwordInputType)
   		})
   	it(`0.5 ქულა. გვერდზე არსებობს რეგისტრაციის ღილაკი, რომლის id არის 
   		${testConfig.registerButton}.`, () => {
   			assert.isNotNull(getButton(testConfig.registerButton))
        })
   	
   })
   describe(`ფუნქციონალი`, () => {
      it(`3 ქულა. რეგისტრაციის ღილაკზე დაჭერის შემთხვევაში users
         ბაზაში ემატება მომხმარებელი ${testConfig.usernameInput} სახელით და 
         ${testConfig.passwordInput} პაროლით`, () => {
            users.clear()
            const user = {
               username: 'abc',
               password: '1234'
            }
            return tester.register(user).then(() => {
               assert.isNotNull(users.get('username', user.username))
            })
         })
   })
   describe(`ვალიდაცია. `, () => {
   	it.skip(`მომხმარებელი ვერ დარეგისტრირდება (ბაზაში არ გამოჩნდება), თუ შემდეგი პირობები არ კმაყოფილდება: `)
   	it(`1.5 ქულა. შეყვანილი username უკვე არსებობს`, () => {
         users.clear()
         const user = {
            username: 'abc',
            password: '1234abcABC'
         }
         return tester.register(user)
         .then(() => tester.register(user))
         .then(() => expect(users.getAll()).length(1))
      })
   	it(`1.5 ქულა. პაროლი და გამეორებული პაროლი არ ემთხვევა`, () => {
         users.clear()
         const user = {
            username: 'abc',
            password: '1234abcABC',
            repeatPassword: '1234abcAB'
         }
         return tester.register(user).then(() => {
            expect(users.getAll()).length(0)
         })

      })
      describe(`პაროლი საკმარისად რთული არაა`, () => {
         it.skip(`შეამოწმეთ, რომ შეყვანილი პაროლი: `)
         it(`1 ქულა. არის მინიმუმ 8 სიმბოლოიანი`, () => {
            users.clear()
            const user = {
               username: 'passwordlength',
               password: '1aC'
            }
            return tester.register(user).then(() => {
               expect(users.getAll()).length(0)
            })
            
         })
         it(`3 ქულა. შეიცავს მინიმუმ ერთ lowercase და ერთ uppercase
            სიმბოლოს და ციფრს`, () => {
            users.clear()
            const user1 = {
               username: 'abc',
               password: '1234abcABC'
            }
            const user2 = {
               username: 'passwordchars',
               password: 'veryweakpassword'
            }
            return tester.register(user1).then(() => {
               expect(users.getAll()).length(1)
               return tester.register(user2)
            }).then(() => {
               expect(users.getAll()).length(1)
            })
         }) 
      })
   })


})
