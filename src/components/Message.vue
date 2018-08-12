<template>
  <div class="message">
    <p class="message">このたび 私たち○○□□と△△は昨年○月に入籍いたしました<br/>
       つきましては ささやかではございますが 日頃よりお世話になっている皆様をお招きして 二次会パーティーを催すこととなりました</p>

    <p  class="message">ご多用中とは存じますが ぜひお越しくださいますよう御案内申し上げます<br/>
       当日お会いできることを楽しみにしております</p>

    <div class="overview">
      日時：○○年○月○日（○） ○○：○○開場 ○○：○○開宴 <br/>
      会場：□□○○<br/>
      場所：東京都○○区□□-□-□ （○○駅南口より 徒歩約△分） <br/>
      地図：URLをここにはります <br/>
      会費：□□円 <br/>
      大変恐縮ですが ○月○日までに本フォームより参加可否のご連絡をお願いいたします（所要時間は１分程度です）<br/>
    </div>
    <p class="message">○○ □□<br/>
       △△(旧姓：□□) </p>
  </div>
</template>

<script>
export default {
  name: 'Message'
}
</script>
<style scoped>

  .overview {
    padding: 5px;
    border-radius: 10px;
    background: #f5f5f5;
    border: 1px solid #000;
  }
</style>
