<template>
  <DxDataGrid
    id="gridContainer"
    :data-source="positions"
    key-expr="id"
    :show-borders="true"
    :show-row-lines="true"
    :show-column-lines="false"
    @exporting="onExporting"
  >
    <DxExport :enabled="true" :formats="['excel']" />
    <DxColumn data-field="id" label="Id" />
    <DxColumn data-field="inventoryNum" />
    <DxColumn data-field="objectName" />
    <DxColumn data-field="qrCode" cell-template="grid-cell-template" />

    <template #grid-cell-template="{ data }">
      <div>
        <img :src="data.value" alt="qr_code" />
      </div>
    </template>
  </DxDataGrid>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { DxColumn, DxDataGrid, DxExport } from 'devextreme-vue/data-grid';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';
import { exportDataGrid as exportExcel } from 'devextreme/excel_exporter';
import { useAppUserStore } from '../stores/app';

let props = defineProps(['loggIn']);

const positions = ref([]);
let store = useAppUserStore();
onMounted(async () => {
  if (props.loggIn) {
    const response = await store.getAllPositions();
    positions.value = response.data;
  }
});

const onExporting = (e) => {
  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet('Main sheet');

  exportExcel({
    component: e.component,
    worksheet,
    autoFilterEnabled: true,
    topLeftCell: { row: 2, column: 2 },
    customizeCell: ({ gridCell, excelCell }) => {
      if (gridCell.rowType === 'data') {
        if (gridCell.column.dataField === 'qrCode') {
          excelCell.value = undefined;

          const image = workbook.addImage({
            base64: gridCell.value,
            extension: 'png',
          });

          worksheet.getRow(excelCell.row).height = 300;
          worksheet.addImage(image, {
            tl: { col: excelCell.col - 1, row: excelCell.row - 1 },
            br: { col: excelCell.col, row: excelCell.row },
          });
        }
      }
    },
  }).then(() => {
    workbook.xlsx.writeBuffer().then((buffer) => {
      saveAs(
        new Blob([buffer], { type: 'application/octet-stream' }),
        'Objects.xlsx',
      );
    });
  });
  e.cancel = true;
};

/*const onExporting = ({ component }) => {
  const doc = new jsPDF();

  exportPdf({
    jsPDFDocument: doc,
    component,
    margin: {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10,
    },
    topLeft: { x: 5, y: 5 },
    columnWidths: [30, 60, 50],
    onRowExporting: (e) => {
      const isHeader = e.rowCells[0].text === 'qrCode';
      if (!isHeader) {
        e.rowHeight = 40;
      }
    },
    customDrawCell: (e) => {
      if (
        e.gridCell.rowType === 'data' &&
        e.gridCell.column.dataField === 'qrCode'
      ) {
        doc.addImage(
          e.gridCell.value,
          'PNG',
          e.rect.x,
          e.rect.y,
          e.rect.w,
          e.rect.h,
        );
        e.cancel = true;
      }
    },
  }).then(() => {
    doc.save('DataGrid.pdf');
  });
};*/
</script>

<style scoped lang="sass"></style>
