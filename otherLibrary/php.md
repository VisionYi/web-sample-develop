## PHP 函式庫

### 驗證 http request 的資料
```php
/**
 * 驗證 http request 的資料是否存在，再把空白與非法字元都濾掉，不存在內容就是 NULL
 *
 * @param  array  $dataField     獲取的資料名稱
 * @param  string $requestMethod http request 的模式: 'POST' 或 'GET'
 * @return array  $result        ['data'] 為全部的資料 ex: {'name' => 'data'}
 *                               ['data_empty'] 為'空'或 NULL的名稱組數 ex: ['name']
 *                               ['data_exist'] 排除'空'與 NULL ex: {'name' => 'data'}
 */
function requestData(array $dataField, $requestMethod)
{
    $result = [];
    $result['data'] = [];
    $result['data_empty'] = [];
    $result['data_exist'] = [];

    if ($requestMethod === 'POST') {
        $requestMethod = $_POST;
    } else if ($requestMethod === 'GET') {
        $requestMethod = $_GET;
    } else {
        throw new \Exception("第二個參數輸入不正確。");
    }

    foreach ($dataField as $value) {
        $result['data'][$value] = isset($requestMethod[$value]) ? strip_tags(trim($requestMethod[$value])) : null;

        if (empty($result['data'][$value])) {
            array_push($result['data_empty'], $value);
        } else {
            $result['data_exist'][$value] = $result['data'][$value];
        }
    }

    return $result;
}
```
