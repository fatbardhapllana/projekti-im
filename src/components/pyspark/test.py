from pyspark.sql import SparkSession

spark = SparkSession.builder.master("local[*]").getOrCreate()
sc = spark.sparkContext

numrat = [1, 2, 3, 4, 5, 6]
rdd = sc.parallelize(numrat)
kubet = rdd.map(lambda x: x ** 3)

print(kubet.collect())

spark.stop()