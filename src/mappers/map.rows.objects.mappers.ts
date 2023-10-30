
export function mapRowsToObjects(rows: any[], fieldNames: string[]) {
    return rows.map(row => {
      let obj: { [key: string]: any } = {};
      for (let i = 0; i < row.length; i++) {
        obj[fieldNames[i]] = row[i];
      }
      return obj;
    });
  }
