<template>
  <DxDataGrid
    id="grid"
    :data-source="inventory"
    :key-expr="'id'"
    :column-auto-width="true"
    :allow-column-reordering="true"
    :width="'100%'"
    :show-borders="true"
    @exporting="onExporting"
  >
    <DxExport :enabled="true" />
    <DxEditing
      :allow-updating="false"
      :allow-adding="false"
      :allow-deleting="false"
      mode="popup"
    />
    <DxColumn caption="N п/п" sort-order="asc" data-field="id" />
    <DxColumn
      caption="Наименование объекта нефинансового актива"
      data-field="objectName"
    />
    <DxColumn
      caption="Номер (код) объекта учета (инвентарный или иной)"
      data-field="inventoryNum"
    />
    <DxColumn caption="Единица измерения" data-field="countUnit" />
    <DxColumn caption="Фактическое наличие (состояние)">
      <DxColumn
        caption="цена (оценочная стоимость), руб"
        data-field="estimatedCost"
      />
      <DxColumn caption="количество" data-field="count" format="fixedPoint" />
      <DxColumn caption="сумма, руб" data-field="sum" />
      <DxColumn caption="статус объекта учета" data-field="status" />
      <DxColumn caption="целевая функция актива" data-field="activeFunction" />
    </DxColumn>
    <DxColumn caption="По данным бухгалтерского учёта">
      <DxColumn caption="номер (код) счета" data-field="code" />
      <DxColumn
        caption="количество"
        data-field="countNominal"
        format="fixedPoint"
      />
      <DxColumn
        caption="балансовая стоимость, руб"
        data-field="balanceCount"
        format="decimal"
      />
    </DxColumn>
    <DxColumn caption="Результаты инвентаризации">
      <DxColumn caption="отклонение">
        <DxColumn caption="недостача">
          <DxColumn caption="количество" data-field="shortageCount" />
          <DxColumn caption="сумма, руб." data-field="shortageSum" />
        </DxColumn>
        <DxColumn caption="излишки">
          <DxColumn caption="количество" data-field="surplusCount" />
          <DxColumn caption="сумма, руб." data-field="surplusSum" />
        </DxColumn>
      </DxColumn>
      <DxColumn caption="не соответствует условиям актива">
        <DxColumn caption="количество" data-field="noConditionCount" />
        <DxColumn caption="сумма, руб." data-field="noConditionSum" />
      </DxColumn>
    </DxColumn>
    <DxColumn caption="Примечания" data-field="notes" />
    <DxSummary>
      <DxTotalItem
        column="balanceCount"
        summary-type="sum"
        :value-format="format"
        display-format="Итого: {0}"
      />
    </DxSummary>
  </DxDataGrid>
</template>

<script setup>
import DxDataGrid, {
  DxColumn,
  DxEditing,
  DxExport,
  DxSummary,
  DxTotalItem,
} from 'devextreme-vue/data-grid';
import { onMounted, ref } from 'vue';
import { saveAs } from 'file-saver-es';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { Workbook } from 'exceljs';
import { useAppUserStore } from '../stores/app';

let props = defineProps(['loggIn']);
const inventory = ref([]);

const format = {
  type: 'fixedPoint',
  precision: 2,
};

let store = useAppUserStore();

onMounted(async () => {
  if (props.loggIn) {
    const response = await store.getAllInventory();
    inventory.value = response.data;
  }
});

const onExporting = (e) => {
  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet('Elements');

  exportDataGrid({
    component: e.component,
    worksheet,
    autoFilterEnabled: true,
  }).then(() => {
    workbook.xlsx.writeBuffer().then((buffer) => {
      saveAs(
        new Blob([buffer], { type: 'application/octet-stream' }),
        'Inventory.xlsx',
      );
    });
  });

  e.cancel = true;
};
</script>

<style scoped lang="sass"></style>
