package Other;

import User.Student;

public class Lesson {
	
	private String filePath;
	public int id;
	public String name;
	public int professorId;
	public int credits;
	public String type;
	public int semester; // 指定學期時間
	
	public Lesson(int id){
		getPath();
		
		// 讀取 Cache 的資料
		String[] LessonInfo = IO.InputById(filePath + "Cache_LessonInfo.txt", id).split(",");
		this.id = id;
		this.name = LessonInfo[1];
		this.professorId = Integer.parseInt(LessonInfo[2]);
		this.credits = Integer.parseInt(LessonInfo[3]);
		this.type = LessonInfo[4];
		this.semester = Integer.parseInt( IO.InputValue(".\\config.txt", "year", ": ") );
	}
	
	public Lesson(int id, int semester){
		getPath();
		
		// 讀取歷年資料
		String[] LessonInfo = IO.InputById(filePath + "LessonInfo\\" + id + ".txt", semester).split(",");
		this.id = id;
		this.name = LessonInfo[1];
		this.professorId = Integer.parseInt(LessonInfo[2]);
		this.credits = Integer.parseInt(LessonInfo[3]);
		this.type = LessonInfo[4];
		this.semester = semester;
	}
	
	private void getPath() {
		this.filePath = IO.InputValue(".\\config.txt", "databasePath", ": ");
	}
	
	private static String getPathForStatic() {
		return IO.InputValue(".\\config.txt", "databasePath", ": ");
	}
	
	public String[] getStudentList() {
		return IO.InputById(filePath + "Score\\" + this.id + ".txt", this.semester).split(",")[1].split("&");
	}
	
	private String[] getScoreList() {
		return IO.InputById(filePath + "Score\\" + this.id + ".txt", this.semester).split(",")[2].split("&");
	}
	
	public String[][] getAllScore() {
		String[] StudentList = this.getStudentList();
		String[] ScoreList = this.getScoreList();
		String[][] OutputData = new String[StudentList.length][2];
		for (int index = 0; index < StudentList.length; index++) {
			OutputData[index] = new String[] {StudentList[index], new Student(Integer.parseInt(StudentList[index])).getName(), ScoreList[index]};
		}
		
		return OutputData;
	}
	
	public void setAllScore(String newScoreList) {
		String strInput = IO.InputById(filePath + "Score\\" + this.id + ".txt", this.semester);
		int outputIndex = strInput.lastIndexOf(",");
		String strOutput = strInput.substring(0, outputIndex) + "," + newScoreList;
		
		IO.OutputById(filePath + "Score\\" + this.id + ".txt", strOutput, this.semester);
	}
	
	public static String[] getLessonListInSemester(int semester) {
		String strOutput = "";
		String filePath = getPathForStatic() + "LessonInfo\\";
		String[] fileList = IO.traverseDirectory(filePath);
		
		for (String file: fileList) {
			String[] InputData = IO.InputAll(filePath + file);
			for (String Element: InputData) {
				String yearInfo = Element.split(",")[0];
				if (yearInfo.indexOf(semester + "") != -1) {
					strOutput += file.substring(0, file.indexOf(".")) + "&";
					break;
				}
			}
		}
		
		if (strOutput == "") return null;
		else return strOutput.substring(0, strOutput.length() - 1).split("&");
	}
	
}
