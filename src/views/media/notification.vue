<template>
  <div>
  notification
    <div @click="notifyMe" class="cursor-pointer">notify me</div>
    <div @click="spawnNotification('spawn body 11111111111', 'static/vip-yellow.png', 'spwan title')" class="cursor-pointer">spawnNotification</div>
    <div @click="randomNotification" class="cursor-pointer">randomNotification</div>
    <div @click="tag" class="cursor-pointer">notificaiton tag</div>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  methods: {
    tag () {
      if (window.Notification && Notification.permission === 'granted') {
        let i = 0
        let interval = setInterval(() => {
          let notification = new Notification('Hi! ' + i, {tag: 'soManyNotification'})
          if (i++ === 9) {
            clearInterval(interval)
          }
        }, 200)
      } else if (window.Notification && Notification.permission !== 'denied') {
        Notification.requestPermission((status) => {
          if (status === 'granted') {
            let i = 0
            let interval = setInterval(() => {
              let notification = new Notification('Hi! ' + i, {tag: 'soManyNotification'})
              if (i++ === 9) {
                clearInterval(interval)
              }
            }, 200)
          } else {
            alert('Hi')
          }
        })
      } else {
        alert('Hi')
      }
    },
    notifyMe () {
      if (!('Notification' in window)) {
        alert('This browser does not support system notification.')
      } else if (Notification.permission === 'granted') {
        let notification = new Notification('Hi there!')
      } else if (Notification.perimission !== 'denied') {
        Notification.requestPermission((result) => {
          if (result === 'granted') {
            let notification = new Notification('Hi there!')
          }
        })
      }
    },
    spawnNotification (theBody, theIcon, theTitle) {
      let options = {
        body: theBody,
        icon: theIcon,
        dir: 'rtl'
      }
      let notification = new Notification(theTitle, options)
      console.log(notification.dir)
      notification.onclick = (event) => {
        console.log(event)
        window.open('http://www.mozilla.org', '_blank');
      }
      notification.onclose((event) => {
        console.log(event)
        window.open('http://www.baidu.com', '_blank')
      })
      // setTimeout(notification.close.bind(notification), 5000)
    },
    randomNotification () {
      let options = {
        body: 'random body',
        icon: 'static/vip-golden.png'
      }
      let notification = new Notification('random', options)
      // setTimeout(notification.close.bind(notification), 5000)
    }
  }
}
</script>
<style lang="less" scoped>
</style>

