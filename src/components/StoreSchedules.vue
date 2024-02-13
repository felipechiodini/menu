<template>
  <div>
    <div class="row">
      <div class="col-2" v-for="(schedule, key) in schedules" :key="key">
        <span>{{ weekDay(schedule.week_day) }}</span>
        <b-form-checkbox switch v-model="schedule.closed">Fechado</b-form-checkbox>
        <label>Abre</label>
        <b-input v-model="schedule.open_at" type="time"></b-input>
        <label>Fecha</label>
        <b-input v-model="schedule.close_at" type="time"></b-input>
      </div>
    </div>
    <b-button @click="save()" variant="primary">Salvar</b-button>
  </div>
</template>

<script>
import Api from '@/js/Api'
import { translateWeekDay } from '@/js/Utils' 

export default {
  name: 'StoreSchedules',
  data: () => {
    return {
      schedules: null
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    async load() {
      const { data } = await Api.get('/schedule')
      this.schedules = data
    },
    async save() {
      await Api.post('/schedule', this.schedules)
    },
    weekDay(weekDay) {
      return translateWeekDay(weekDay)
    }
  }
}
</script>

<style>

</style>