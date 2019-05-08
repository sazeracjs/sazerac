export function isPrime(num) {
  for(let i = 2; i < num; i++) {
    if(num % i === 0) return false
  }
  return num > 1
}

export function getMessage(type) {
  switch (type) {
    case 'email':
      return {
        subject: '(none)',
        body: '(none)',
        to: 'mike@mike.com'
      }
    case 'sms':
      return {
        image: 'img',
        body: '(none)',
        to: '123456'
      }
    case 'snapchat':
      return {
        image: 'img',
        body: '(none)',
        to: 'mikec'
      }
  }
}

export default {
  isPrime,
  getMessage
}
