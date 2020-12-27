package User;

import Other.IO;

public class Professor extends User{
	
	public Professor(int Id) {
		super(Id);
	}
    
    public String[] getLessonList() {
		String[] LessonList = IO.InputAll(filePath + "Cache_LessonInfo.txt");
		String strOutput = "";
		for (String Element: LessonList) {
			if (Integer.parseInt(Element.split(",")[2]) == this.id) strOutput += Element.split(",")[0] + "&";
		}
		
		if (strOutput == "") return null;
		else return strOutput.substring(0, strOutput.length() - 1).split("&");
	}
	
}
