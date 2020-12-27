package User;
import java.text.SimpleDateFormat;
import java.util.Date;

import Other.*;

public class Manager extends User{

    public Manager(int Id) {
		super(Id);
	}

    
    public  void updateAccount(String newData){
        IO.OutputAll(filePath+"Account.txt",newData);
    }

    public  String[][] getAccountInfo(){
        String[] data = IO.InputAll(filePath+"Account.txt");
        String[][] newData = new String[data.length][];
        for(int i=0;i<data.length;i++){
            newData[i] = data[i].split(",");
        }
        return newData;
    }

    public  String[][] getLessonInfo(){
        String[] data = IO.InputAll(filePath+"Cache_LessonInfo.txt");
        String[][] newData = new String[data.length][];
        for(int i=0;i<data.length;i++){
            newData[i] = data[i].split(",");
        }
        return newData;
    }
    public  String[] getLessonIdName(){
        String[] data = IO.InputAll(filePath+"Cache_LessonInfo.txt");
        String[]newData = new String[data.length];
        for(int i=0;i<data.length;i++){
            newData[i] = data[i].split(",")[0] + ":"+data[i].split(",")[1];
        }
        return newData;
    }
    public void verifyAccount(int id){
        String[] userInfo = IO.InputById(filePath + "Account.txt",id).split(",");
        userInfo[userInfo.length-2] = "1";
        String newUserInfo ="";
        for(String Element : userInfo){
            newUserInfo += Element + ",";
        }
        newUserInfo = newUserInfo.substring(0,newUserInfo.length()-1);
        modifyUserAccount(id,newUserInfo);

    }
    public void createNewAccount(int id, String userName, String password, String stateOfVerification,String identity ){
        SimpleDateFormat sdFormat = new SimpleDateFormat("yyyy");
        Date date = new Date();
        String strDate = Integer.parseInt(sdFormat.format(date))-1911+"";
        String[] userInfo = new String[1];
        userInfo[0] = (id + "," + userName + "," + password + "," + stateOfVerification + "," + identity+","+strDate);
        IO.OutputAtLast(filePath + "Account.txt", userInfo);
    }

    public void modifyUserAccount(int id,String newUserInfo){
        IO.OutputById(filePath + "Account.txt", newUserInfo, id);
    }

    public void deleteUserAccount(int id){
        IO.OutputById(filePath + "Account.txt", null, id);
    }

    public void createNewLessonInfo(int id, String LessonName, String professor, int creditOfLesson, String LessonType){
        String[] LessonInfo = new String[1];
        LessonInfo[0] = (id + ","+ LessonName + "," + professor + "," + creditOfLesson + "," + LessonType);
        IO.OutputAtLast(filePath + "Cache_LessonInfo.txt",LessonInfo);
        IO.createTxt(filePath+"\\LessonInfo",id);
    }

    public void modifyLessonInfo(int id, String newLessonInfo){
        IO.OutputById(filePath + "Cache_LessonInfo.txt", newLessonInfo, id);
    }

    public void deleteLessonInfo(int id){
        IO.OutputById(filePath + "Cache_LessonInfo.txt", null, id);
    }

    public void addLessonForStudentInSemester(int studentID, int LessonID,int whichSemester){
        String[] LessonList = (new Student(studentID).getLessonList());
        for(int index = 0; index < LessonList.length; index += 2){
            if(LessonList[index].equals(whichSemester + "")){
                LessonList[index + 1] = LessonList[index + 1] + "&" + LessonID;
                break;
            }
        }
        String outputData = studentID + ",";
        for(int index = 0; index < (LessonList.length - 1); index++){
            outputData += LessonList[index] + "#";
        }
        outputData += LessonList[LessonList.length - 1];
        IO.OutputById(filePath + "StudentInfo.txt", outputData, studentID);
    }

    public void setDefaultScoreForStudentInClass(int studentId,int lessonId, int whichSemester){
        String scoreList = IO.InputById(filePath+ "Score\\" + lessonId+".txt",whichSemester);
        System.out.println(scoreList);
    }

    public String[][] getStudentInfo(){
        String[] stuInfo = IO.InputAll(filePath+"CourseRegistration.txt");
        String[][] stuList = new String[stuInfo.length][1];
        for(int i=0;i<stuInfo.length;i++){
            stuList[i][0] = stuInfo[i].split(",")[0];
        }
        return stuList;
    }

    public void modifyStudentLessonList(int studentId,int classId,int whichSemester ){
        String oldData = IO.InputById(filePath+"CourseRegistration.txt",studentId);
        String[] oldDataList = oldData.split(",")[1].split("#");
        for(int i=0;i<oldDataList.length;i=i+2){
            if(oldDataList[i].equals(whichSemester+"")){
                oldDataList[i+1] += "&" + classId;
            }
            break;
        }
        String newData = studentId+"," ;
        for(int i=0;i<oldDataList.length;i++){
            if(i%2==0){
                newData += oldDataList[i] + "#";
            }
            else {
                newData += oldDataList[i];
            }
        }
        System.out.println(newData);
        IO.OutputById(filePath+"CourseRegistration.txt",newData,studentId);
    }
    public void deleteStudentLessonList(int studentId,int classId,int whichSemester ){
        String oldData = IO.InputById(filePath+"CourseRegistration.txt",studentId);
        String[] oldDataList = oldData.split(",")[1].split("#");
        for(int i=0;i<oldDataList.length;i=i+2){
            if(oldDataList[i].equals(whichSemester+"")){
                String[] temp = oldDataList[i+1].split("&");
                for(int k=0;k<temp.length;k++){
                    if(temp[k].equals(classId+"")){
                        temp[k] = "";
                    }
                }
                oldDataList[i+1] ="";
                System.out.println(temp.length);
                for(int k=0;k<temp.length;k++){
                    if(!temp[k].equals("")){
                        oldDataList[i+1] += temp[k] +"&";
                    }
                }
                oldDataList[i+1] = oldDataList[i+1].substring(0,oldDataList[i+1].length()-1);
                break;
            }

        }
        String newData = studentId+"," ;
        for(int i=0;i<oldDataList.length;i++){
            if(i%2==0){
                newData += oldDataList[i] + "#";
            }
            else {
                newData += oldDataList[i];
            }
        }
        System.out.println(newData);
        IO.OutputById(filePath+"CourseRegistration.txt",newData,studentId);
    }
    
}
