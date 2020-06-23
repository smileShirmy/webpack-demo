 <template>
  <div class="demo-scss">
    {{message}}
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

function func() {
  console.log('func')
}

@Component({})
export default class extends Vue {
  message = 'test123'
}
</script>
