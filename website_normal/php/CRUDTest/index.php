<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />

	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous" />

	<title>CURDTest</title>

	<style>
		.table {
			margin-left: auto;
			margin-right: auto;
			width: 90%;
		}

		.table thead tr th {
			width: 18%;
			text-align: center;
			padding: 5px;
			background-color: #595959;
			color: white;
			border: 1px solid gray !important;
			letter-spacing: 2px;
		}

		.table tbody td {
			border: 1px solid gray;
			width: 18%;
			text-align: center;
			vertical-align: middle;
			overflow: hidden;
			padding: 0px;
		}

		.table tbody td .btn {
			border-radius: 40%;
		}

		#btnManage {
			text-align: center;
		}
	</style>
</head>

<body>
	<table id="myTable" class="table">
		<thead>
			<tr>
				<th></th>
				<th>node</th>
				<th>name</th>
				<th>type</th>
				<th>price</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><button type="button" class="btn btn-danger" onclick="deleteData(this)">—</button></td>
				<td contenteditable="true"></td>
				<td contenteditable="true"></td>
				<td contenteditable="true"></td>
				<td contenteditable="true"></td>
			</tr>
			<tr>
				<td><button type="button" class="btn btn-danger" onclick="deleteData(this)">—</button></td>
				<td contenteditable="true"></td>
				<td contenteditable="true"></td>
				<td contenteditable="true"></td>
				<td contenteditable="true"></td>
			</tr>
		</tbody>
	</table>
	<div id="btnManage">
		<button class="belowBtn" onclick="createData()">create</button>
		<button class="belowBtn" onclick="readData()">Read</button>
	</div>
	<div>
		<p>資料庫連接</p>
		<p id="aaa"></p>
	</div>

</body>

<script>
	let data = [
		['1', '抹茶生乳捲', '生乳捲', '100'],
		['2', '草莓虎皮蛋糕', '虎皮蛋糕', '80'],
	];

	function createData() {
		let newRow = document.createElement('tr');
		newRow.innerHTML = `<td><button type="button" class="btn btn-danger" onclick="deleteData(this)"> — </button></td>
		                              <td contenteditable="true"></td>
		                              <td contenteditable="true"></td>
		                              <td contenteditable="true"></td>
		                              <td contenteditable="true"></td>`;
		document.getElementById('myTable').querySelector('tbody').appendChild(newRow);
	}

	function readData() {
		const ajax = new XMLHttpRequest();

		ajax.onload = () => {
			// let response = () => {
			// 	"use strict";
			// 	return (ajax.response);
			// };
			// let get = response();
			console.log(123);
			let response = Function('"use strict";return (' + ajax.responseText + ')')();

			console.log(response);
			// document.getElementById('aaa').innerHTML += "\n" + ajax.responseText;
		};
		ajax.open('GET', 'connectPSQL.php');
		ajax.send();

		let tableTBodyTrList = document.getElementById('myTable').querySelector('tbody').children;
		let length = tableTBodyTrList.length > data.length ? data.length : tableTBodyTrList.length;

		for (let i = 0; i < length; i++) {
			var tRow = data[i];
			for (var j = 0; j < tRow.length; j++) {
				var getValue = tRow[j];
				tableTBodyTrList[i].children[j + 1].innerHTML = getValue;
			}
		}
	}

	function deleteData(getItem) {
		getItem.parentElement.parentElement.remove();
	}
</script>

</html>