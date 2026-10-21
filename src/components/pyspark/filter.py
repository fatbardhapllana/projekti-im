from pyspark import SparkContext

sc = SparkContext("local", "FilterSparkLines")
fileRDD = sc.textFile("examplefile.md")

filteredRDD = fileRDD.filter(lambda line: "Spark" in line)

count = filteredRDD.count()
print("Number of lines containing 'Spark':", count)
for line in filteredRDD.take(4):
    print(line)

sc.stop()