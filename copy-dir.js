const fs = require('fs-extra');

const listFolderCopy = [
  {
    sourceDirectory: "views", //views cùng cấp với copy-dir nên chỉ cần "views"
    targetDirectory: "dist/views" // Nơi cần copy vào
  },
  {
    sourceDirectory: "public",
    targetDirectory: "dist/public" 
  }
];

listFolderCopy.forEach(item => {
  fs.copy(item.sourceDirectory, item.targetDirectory, (err) => {
    if(err) {
      console.error(`Lỗi sao chép thư mục ${item.sourceDirectory}: `, err);
    } else {
      console.error(`Sao chép thành công thư mục ${item.sourceDirectory}`);
    }
  });
});