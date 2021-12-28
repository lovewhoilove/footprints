# footprints
足迹点地图展示系统

# 非分页查询接口返回数据结构

- code 编码
  - desc 描述
  - data 数据对象（数组或者对象）
# 分页查询接口返回数据结构

  - code 编码
  - desc 描述
  - data 数组对象
  - pageInfo      分页对象
    - first    是否第一页
    - last        是否最后一页
    - number      当前页
    - size        当前页大小
    - totalPage   总页数
    - totalSize   总条数

Code编码自定义

  - 2000 处理成功
  - 3000 处理失败
  - 4000 参数错误
  - 4010 token过期
  - 4100 权限不足
  - 4200 密钥错误
  - 5000 服务器异常