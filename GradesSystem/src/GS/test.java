package GS;

import GS.proc.component.Table;
import Other.*;
import User.*;

public class test {
	static String filePath = "C:\\Users\\USER\\Desktop\\Database\\";
	
	public static void printArray(String[] array) {
		if (array == null) {
			System.out.println("null");
			return;
		}
		for(String Element: array) {
			System.out.print(Element + " ");
		}
		System.out.println();
	}
	
	public static void printArray2(String[][] array) {
		for(String[] InnerArray: array) {
			for(String Element: InnerArray) {
				System.out.print(Element + " ");
			}
			System.out.println();
		}
		System.out.println();
	}

	public static void main(String[] args) {
		/*String[] Data = IO.Input(filePath + "Account.txt");
		printArray(Data);*/
	
		/*IO.OutputById(filePath + "Account.txt", "1,Jhon,456", 1);
		Data = IO.Input(filePath + "Account.txt");
		printArray(Data);*/
		
		/*System.out.println();
		String a = IO.InputById(filePath + "Account.txt", 3);
		System.out.println(a);*/
		
		/*User.User uu = new User.User();
		uu.getStudentListInLesson(1);*/
		
		/*User.User uu = new User.User();
		uu.getLessonListOfStudent(4);*/
		
		/*User.User uu = new User.User();
		uu.getScoreInLesson(2);*/
		
		/*User.User uu = new User.User();
		printArray(uu.getStudentAllScore(4));*/
		
		/*Lesson les01 = new Lesson(1);
		printArray(les01.getStudentAndScore());
		System.out.println(les01.getStudentList(109));
		System.out.println(les01.getScoreList(109));
		System.out.println(les01.getStudentAndScore(109));*/
		
		//View v = new View();
		
		//System.out.println(Other.IO.InputByName(filePath + "Account.txt", "Jhon"));
	
		//Other.IO.OutputById(filePath + "123.txt", null, 6);
		
		/*Manager M = new Manager();
		M.addLessonForStudentInSemester(4, 3, 109);*/
		
		//System.out.println(new User.Student(3).getLessonListOfStudent()[1]);
	
		//printArray(Lesson.getLessonListInSemester(108));
		
		//System.out.println(new Lesson(1));
		
		/*String[] Data = {"4","1","5","1","8","1"};
		new Lesson(1).setStudentAndScoreInSemester(108, Data);*/
		
		/*User uu = new User(6);
		uu.changePassword("12");*/
		
		/*Model m = new Model();
		m.setUser(3);
		printArray(m.getOwnGrade());*/
		
		/*Student s = new Student(4);
		printArray2(s.getAllScore());*/
		
		/*Professor p = new Professor(2);
		printArray(p.getLessonList());*/
		
		//Table t = new Table(new String[] {"1", "2", "3"}, new String[][] {{"1","2","3"}, {"5","6","7"}}, "歷年成績", true);
		//printArray(t.getModel().getData());
		
		/*Lesson l = new Lesson(1);
		l.setAllScoreInSemester(108, "88&77&66");*/
		
		//printArray(IO.traverseDirectory("C:\\Users\\USER\\Desktop\\Database\\"));;
		//printArray(Lesson.getLessonListInSemester(109));
	
		//System.out.println(IO.InputValue(".\\config.txt", "since", ": "));
		
		//IO.createTxt("C:\\Users\\USER\\Desktop", 12);
		
		//printArray2(new Lesson(1, 109).getAllScore());
		
		//IO.OutputById("C:\\Users\\USER\\Desktop\\12.txt", null, 12);
		
		IO.OutputAtLast("C:\\Users\\USER\\Desktop\\12.txt", new String[] {"1", "2"});
		
	}

}
