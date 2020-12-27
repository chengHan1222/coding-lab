package GS.proc;

import Other.Lesson;
import User.Student;
import User.Manager;

import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import javax.swing.*;

public class managerMenu implements ActionListener{
	public static void main(String[] args) {
        new managerMenu();
    }
	
    private Manager admin = new Manager(1);

    private JFrame fm=new JFrame("管理員選單");
    private JPanel cardpan,containbtn; //cardpan為卡片顯示區域， containbtn為按鈕顯示區域
    private JButton btn1,btn5,btn6,btn9; //功能的按鈕
    private JPanel pan1,pan5,pan6,pan9; //面板中的按鈕
    private CardLayout card;    //定義卡片佈局


    //pan1元件
    private JLabel idLabel_pan1 = new JLabel("請輸入ID");
    private JTextField idField_pan1 = new JTextField(20);
    private JLabel nameLabel_pan1 = new JLabel("請輸入姓名");
    private JTextField nameField_pan1 = new JTextField(20);
    private JLabel pwLabel_pan1 = new JLabel("請輸入密碼");
    private JTextField pwField_pan1 = new JTextField(20);
    private JComboBox typeComboBox  = new JComboBox(new Object[]{"Student","Professor"});
    private String[][] accountInfoData = admin.getAccountInfo();
    private String[] accountDataTitle = {"ID","姓名","密碼","認證狀況","身分","創帳時間"};
    private JTable accountTable = new JTable(accountInfoData, accountDataTitle);
    private JScrollPane jscrollpane_pan1 = new JScrollPane(accountTable);
    private JButton addNewAccountButton =new JButton("新增");
    private JButton modifyAccountButton = new JButton("修改");
    private JButton deleteAccountButton =new JButton("刪除");
    JPanel panel_pan1 = new JPanel();

    //pan5元件
    private JLabel IdField_pan5 = new JLabel("請輸入學生ID");
    private JTextField enterID_pan5 = new JTextField(20);
    private JLabel yearField_pan5 = new JLabel("請輸入年度");
    private JTextField enterYear_pan5 = new JTextField(20);
    private JButton confirmToSearchBtn_pan5 = new JButton("查詢");; //確認查詢按鈕
    private JTable scoreTable;
    private JScrollPane jscrollpane_pan5 ;
    private JLabel studentNameLabel_pan5;



    //pan6元件
    private String[][] lessonInfoData = admin.getLessonInfo();
    private String[] lessonDataTitle = {"課程ID","課程名稱","教授ID","學分數","必/選"};
    private JTable lessonTable = new JTable(lessonInfoData,lessonDataTitle);
    private JScrollPane jscrollpane_pan6 = new JScrollPane(lessonTable);
    private JButton addNewLessonButton =new JButton("新增");
    private JButton modifyLessonButton = new JButton("修改");
    private JButton deleteLessonButton =new JButton("刪除");
    JPanel panel_pan6 = new JPanel();


    private JLabel classIdField_pan6 = new JLabel("請輸入新增課程的ID");
    private JTextField enterClassID_pan6 = new JTextField(20);
    private JLabel classNameField_pan6 = new JLabel("請輸入課程名稱");
    private JTextField enterClassName_pan6 = new JTextField(20);
    private JLabel professorIdField_pan6 = new JLabel("請輸入該課程教授ID");
    private JTextField enterProfessorID_pan6 = new JTextField(20);
    private JLabel classCreditField_pan6 = new JLabel("輸入學分數");
    private JTextField enterClassCredit_pan6 = new JTextField(20);
    private JComboBox classType_pan6 = new JComboBox(new Object[]{"必修","選修"});
    private JLabel yearField_pan6 = new JLabel("請輸入開課年度");
    private JTextField enterClassYear_pan6 = new JTextField(20);

    //pan9
    private String[][] studentData = admin.getStudentInfo();
    private String[] studentTitle = {"學生ID"};
    private JTable studentTable = new JTable(studentData,studentTitle);
    private String[] yearTitle = {"年分"};
    private String[][] yearData = {{"年分"}};
    private JTable yearTable = new JTable(yearData,yearTitle);
    private JScrollPane jscrollpane_pan9_1 = new JScrollPane(studentTable);
    private JScrollPane jscrollpane_pan9_2 = new JScrollPane(yearTable);
    private String[] classTitle_pan9 = {"課程ID","課程名稱"};
    private String[][] classData_pan9 = new String[][]{{"id","name"}};
    private JTable classTable_pan9 = new JTable(classData_pan9,classTitle_pan9);
    private JScrollPane jscrollpane_pan9_3 = new JScrollPane(classTable_pan9);
    private JComboBox allClassComboBox = new JComboBox(admin.getLessonIdName());

    private JButton selectButton_pan9 = new JButton("選取");
    private JButton searchButton_pan9 = new JButton("查詢");
    private JPanel buttonPanel_pan9 = new JPanel();

    private JButton addLesson_pan9 = new JButton("增加課程");
    private JButton deleteLesson_pan9 = new JButton("刪除課程");

    private JLabel stuIdField_pan9 = new JLabel("請輸入選課學生ID");
    private JTextField enterStuId_pan9 = new JTextField(20);
    private JLabel yearField_pan9 = new JLabel("請輸入課程年度");
    private JTextField enterYear_pan9 = new JTextField(20);;
    private JLabel classIdField_pan9 = new JLabel("請輸入課程ID");;
    private JTextField enterClassId_pan9 = new JTextField(20);;
    private JButton confirmToAddClassForStudent_pan9 = new JButton("確定選課");;


    public managerMenu(){

//以下為初始化元件
        cardpan=new JPanel();
        containbtn=new JPanel();
        card=new CardLayout();
        cardpan.setLayout(card);
        btn1=new JButton("帳戶管理");
        btn5=new JButton("印出成績單");
        btn6=new JButton("課程管理");
        btn9=new JButton("新增學生課程");

//把定義的按鈕放到顯示按鈕的面板中
        containbtn.add(btn1);
        containbtn.add(btn5);
        containbtn.add(btn6);
        containbtn.add(btn9);
        pan1=new JPanel();
        pan5=new JPanel();
        pan6=new JPanel();
        pan9=new JPanel();
//給按鈕新增監聽事件
        btn1.addActionListener(this);
        btn5.addActionListener(this);
        btn6.addActionListener(this);
        btn9.addActionListener(this);


        addNewAccountButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                int id = Integer.parseInt(idField_pan1.getText());
                String name  = nameField_pan1.getText();
                String pw = pwField_pan1.getText();
                String type = typeComboBox.getSelectedItem().toString();
                admin.createNewAccount(id,name,pw,"0",type);
                refreshPan1();
            }
        });

        modifyAccountButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                String newData = "";
                for(int i = 0; i< accountTable.getRowCount(); i++){
                    for(int j = 0; j< accountTable.getColumnCount(); j++){
                        newData += accountTable.getValueAt(i,j)+",";
                    }
                    newData = newData.substring(0,newData.length()-1);
                    newData += "\n";
                }
                admin.updateAccount(newData);
                refreshPan1();
            }

        });

        deleteAccountButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                int id = Integer.parseInt(accountTable.getValueAt(accountTable.getSelectedRow(),0).toString());
                admin.deleteUserAccount(id);
                refreshPan1();
            }
        });

        addNewLessonButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                int classId = Integer.parseInt(enterClassID_pan6.getText());
                String lessonName = enterClassName_pan6.getText();
                String professorId = enterProfessorID_pan6.getText();
                int classCredit = Integer.parseInt(enterClassCredit_pan6.getText());
                String lessonType = classType_pan6.getSelectedItem().toString();
                admin.createNewLessonInfo(classId,lessonName,professorId,classCredit,lessonType);
                refreshPan6();
            }
        });
        modifyLessonButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                int classId = Integer.parseInt(enterClassID_pan6.getText());
                String className = enterClassName_pan6.getText();
                String professorId = enterProfessorID_pan6.getText();
                int classCredit = Integer.parseInt(enterClassCredit_pan6.getText());
                String classType = (String) classType_pan6.getSelectedItem();
                admin.createNewLessonInfo(classId, className, professorId, classCredit, classType);
                refreshPan6();
            }
        });
        deleteLessonButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                int lessonId  = Integer.parseInt(lessonTable.getValueAt(lessonTable.getSelectedRow(),0).toString());
                admin.deleteLessonInfo(lessonId);
                refreshPan6();
            }
        });
        confirmToSearchBtn_pan5.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                int studentId =  Integer.parseInt(enterID_pan5.getText());
                int year=  Integer.parseInt(enterYear_pan5.getText());
                String[] dataTitle = {"科目","成績"};
                Student student = new Student(studentId);
                String[] studentClassList = student.getLessonList();
                String[] studentScoreList = student.getScoreList();
                String[] targetClass =null;
                String[] targetScore = null;

                for(int i=0;i<studentClassList.length;i = i+2){
                    if(studentClassList[i].equals(year+"")){
                        targetClass = studentClassList[i+1].split("&");
                        targetScore = studentScoreList[i+1].split("&");
                    }
                }
                String[][] scoreData = new String[targetClass.length][2];
                for(int i=0;i<targetClass.length;i++){
                    int claasId = Integer.parseInt(targetClass[i]);
                    Lesson currLesson =  new Lesson(claasId);
                    scoreData[i] = (currLesson.name+" "+ targetScore[i]).split(" ");
                }
                studentNameLabel_pan5 = new JLabel(new Student(studentId).getName());
                pan5.add(studentNameLabel_pan5);
                studentNameLabel_pan5.setSize(100,20);
                studentNameLabel_pan5.setLocation(400,20);
                scoreTable = new JTable(scoreData,dataTitle);
                jscrollpane_pan5 = new JScrollPane(scoreTable);
                pan5.add(jscrollpane_pan5);
                jscrollpane_pan5.setSize(200,1000);
                jscrollpane_pan5.setLocation(300,40);
                pan5.setVisible(false);
                pan5.setVisible(true);
            }
        });

        confirmToAddClassForStudent_pan9.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                int studentId = Integer.parseInt(enterStuId_pan9.getText());
                int classYear = Integer.parseInt(enterYear_pan9.getText());
                int classId = Integer.parseInt(enterClassId_pan9.getText());
                admin.addLessonForStudentInSemester(studentId,classId,classYear);
            }
        });

        selectButton_pan9.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                int studentId = Integer.parseInt(studentTable.getValueAt(studentTable.getSelectedRow(),0).toString());
                Student stu = new Student(studentId);
                String[] studentList = stu.getLessonList();
                String[] studentClassInYear = new String[studentList.length/2];
                String[] studentClass = new String[studentList.length/2];
                yearData = new String[studentList.length/2][1];
                for(int i=0;i<studentList.length;i=i+2){
                    yearData[i/2][0] = studentList[i];
                    studentClassInYear[i/2] = studentList[i];
                    studentClass[i/2] = studentList[i+1];
                }
                pan9.remove(jscrollpane_pan9_2);
                yearTable = new JTable(yearData,yearTitle);
                jscrollpane_pan9_2 = new JScrollPane(yearTable);
                refreshPan9();
            }
        });
        searchButton_pan9.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                Integer stuId = Integer.parseInt(studentTable.getValueAt(studentTable.getSelectedRow(),0).toString());
                int year = Integer.parseInt(yearTable.getValueAt(yearTable.getSelectedRow(),0).toString());
                Student stu = new Student(stuId);
                String[] lessonList = stu.getLessonList();
                String stuClass = "";
                for(int i=0;i<lessonList.length;i=i+2){
                    if(lessonList[i].equals(year+"")){
                        stuClass = lessonList[i+1];
                        break;
                    }
                }
                String[] stuClassList = stuClass.split("&");
                classData_pan9 = new String[stuClassList.length][2];
                for(int i=0;i<stuClassList.length;i++){
                    classData_pan9[i][0] = stuClassList[i];
                    classData_pan9[i][1] = new Lesson(Integer.parseInt(stuClassList[i])).name;
                    //System.out.println(classData_pan9[i][0]  +" "+classData_pan9[i][1] );
                }
                pan9.remove(jscrollpane_pan9_3);
                classTable_pan9 = new JTable(classData_pan9,classTitle_pan9);
                jscrollpane_pan9_3 = new JScrollPane(classTable_pan9);
                pan9.add(jscrollpane_pan9_3);
                jscrollpane_pan9_3.setSize(120,300);
                jscrollpane_pan9_3.setLocation(170,0);
                pan9.setVisible(false);
                pan9.setVisible(true);
            }
        });

        addLesson_pan9.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                String classIdName = allClassComboBox.getSelectedItem().toString();
                int classId = Integer.parseInt(classIdName.split(":")[0]);
                int stuId = Integer.parseInt(studentTable.getValueAt(studentTable.getSelectedRow(),0).toString());
                admin.modifyStudentLessonList(stuId,classId,109);
            }
        });
        deleteLesson_pan9.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                String classIdName = allClassComboBox.getSelectedItem().toString();
                int classId = Integer.parseInt(classIdName.split(":")[0]);
                int stuId = Integer.parseInt(studentTable.getValueAt(studentTable.getSelectedRow(),0).toString());
                admin.deleteStudentLessonList(stuId,classId,109);


                pan9.remove(jscrollpane_pan9_3);
                int year = Integer.parseInt(yearTable.getValueAt(yearTable.getSelectedRow(),0).toString());
                Student stu = new Student(stuId);
                String[] lessonList = stu.getLessonList();
                String stuClass = "";
                for(int i=0;i<lessonList.length;i=i+2){
                    if(lessonList[i].equals(year+"")){
                        stuClass = lessonList[i+1];
                        break;
                    }
                }
                String[] stuClassList = stuClass.split("&");
                classData_pan9 = new String[stuClassList.length][2];
                for(int i=0;i<stuClassList.length;i++){
                    classData_pan9[i][0] = stuClassList[i];
                    classData_pan9[i][1] = new Lesson(Integer.parseInt(stuClassList[i])).name;
                    //System.out.println(classData_pan9[i][0]  +" "+classData_pan9[i][1] );
                }
                classTable_pan9 = new JTable(classData_pan9,classTitle_pan9);
                jscrollpane_pan9_3 = new JScrollPane(classTable_pan9);
                pan9.add(jscrollpane_pan9_3);
                jscrollpane_pan9_3.setSize(120,300);
                jscrollpane_pan9_3.setLocation(170,0);
                pan9.setVisible(false);
                pan9.setVisible(true);
            }
        });

        //pan1

        pan1.setLayout(null);
        pan1.add(idLabel_pan1);//提示ID標籤
        idLabel_pan1.setSize(100,20);
        idLabel_pan1.setLocation(745,48);
        pan1.add(idField_pan1);
        idField_pan1.setSize(100,20); // 輸入id
        idField_pan1.setLocation(800,50);

        pan1.add(nameLabel_pan1);//提示名字標籤
        nameLabel_pan1.setSize(100,20);
        nameLabel_pan1.setLocation(735,68);
        pan1.add(nameField_pan1); //輸入名字
        nameField_pan1.setSize(100,20);
        nameField_pan1.setLocation(800,70);

        pan1.add(pwLabel_pan1);//提示密碼標籤
        pwLabel_pan1.setSize(100,20);
        pwLabel_pan1.setLocation(735,88);
        pan1.add(pwField_pan1);//輸入密碼
        pwField_pan1.setSize(100,20);
        pwField_pan1.setLocation(800,90);

        pan1.add(typeComboBox);//輸入身分類別
        typeComboBox.setSize(100,20);
        typeComboBox.setLocation(800,110);

        pan1.add(jscrollpane_pan1);
        jscrollpane_pan1.setSize(500,500);
        panel_pan1.setSize(80,100);
        panel_pan1.setLocation(1000,80);
        panel_pan1.add(addNewAccountButton);
        panel_pan1.add(modifyAccountButton);
        panel_pan1.add(deleteAccountButton);
        pan1.add(panel_pan1);
        panel_pan1.setBackground(Color.pink);


        //pan5
        pan5.setLayout(null);
        pan5.add(IdField_pan5);
        IdField_pan5.setSize(100,20);
        IdField_pan5.setLocation(740,50);
        pan5.add(enterID_pan5);
        enterID_pan5.setSize(100,20);
        enterID_pan5.setLocation(860,50);
        pan5.add(yearField_pan5);
        yearField_pan5.setSize(100,20);
        yearField_pan5.setLocation(740,70);
        pan5.add(enterYear_pan5);
        enterYear_pan5.setSize(100,20);
        enterYear_pan5.setLocation(860,70);
        pan5.add(confirmToSearchBtn_pan5);
        confirmToSearchBtn_pan5.setSize(100,20);
        confirmToSearchBtn_pan5.setLocation(860,90);
        //pan6
        pan6.setLayout(null);
        pan6.add(jscrollpane_pan6);
        jscrollpane_pan6.setSize(500,500);
        panel_pan6.add(addNewLessonButton);
        panel_pan6.add(modifyLessonButton);
        panel_pan6.add(deleteLessonButton);
        pan6.add(panel_pan6);
        panel_pan6.setSize(80,100);
        panel_pan6.setLocation(1000,80);
        panel_pan6.setBackground(Color.pink);

        pan6.add(classIdField_pan6);
        classIdField_pan6.setSize(120,20);
        classIdField_pan6.setLocation(600,50);
        pan6.add(enterClassID_pan6);
        enterClassID_pan6.setSize(120,20);
        enterClassID_pan6.setLocation(720,50);
        pan6.add(classNameField_pan6);
        classNameField_pan6.setSize(120,20);
        classNameField_pan6.setLocation(600,70);
        pan6.add(enterClassName_pan6);
        enterClassName_pan6.setSize(120,20);
        enterClassName_pan6.setLocation(720,70);
        pan6.add(professorIdField_pan6);
        professorIdField_pan6.setSize(120,20);
        professorIdField_pan6.setLocation(600,90);
        pan6.add(enterProfessorID_pan6);
        enterProfessorID_pan6.setSize(120,20);
        enterProfessorID_pan6.setLocation(720,90);
        pan6.add(classCreditField_pan6);
        classCreditField_pan6.setSize(120,20);
        classCreditField_pan6.setLocation(600,110);
        pan6.add(enterClassCredit_pan6);
        enterClassCredit_pan6.setSize(120,20);
        enterClassCredit_pan6.setLocation(720,110);
        pan6.add(classType_pan6);
        classType_pan6.setSize(120,20);
        classType_pan6.setLocation(720,130);



        //pan9
        pan9.setLayout(null);
        pan9.add(stuIdField_pan9);
        pan9.add(enterStuId_pan9);
        pan9.add(yearField_pan9);
        pan9.add(enterYear_pan9);
        pan9.add(classIdField_pan9);
        pan9.add(enterClassId_pan9);
        pan9.add(confirmToAddClassForStudent_pan9);


        pan9.add(jscrollpane_pan9_1);
        jscrollpane_pan9_1.setSize(50,300);
        jscrollpane_pan9_1.setLocation(40,0);
        pan9.add(jscrollpane_pan9_2);
        jscrollpane_pan9_2.setSize(50,300);
        jscrollpane_pan9_2.setLocation(100,0);
        pan9.add(jscrollpane_pan9_3);
        jscrollpane_pan9_3.setSize(120,300);
        jscrollpane_pan9_3.setLocation(170,0);

        pan9.add(allClassComboBox);
        allClassComboBox.setSize(100,50);
        allClassComboBox.setLocation(800,0);

        buttonPanel_pan9.add(selectButton_pan9);
        buttonPanel_pan9.add(searchButton_pan9);
        buttonPanel_pan9.add(addLesson_pan9);
        buttonPanel_pan9.add(deleteLesson_pan9);


        pan9.add(buttonPanel_pan9);
        buttonPanel_pan9.setSize(80,150);
        buttonPanel_pan9.setLocation(300,80);
        buttonPanel_pan9.setBackground(Color.pink);

//把定義好的面板放到卡片佈局的元件中
        cardpan.add("b1",pan1);
        cardpan.add("b5",pan5);
        cardpan.add("b6",pan6);
        cardpan.add("b9",pan9);
        fm.add(containbtn,BorderLayout.NORTH);//把顯示按鈕的元件放到上面顯示
        fm.add(cardpan,BorderLayout.CENTER);//把顯示文字域的元件放到中間顯示
        fm.setSize(1200,800);
        fm.setLocation(200,100);
        fm.setVisible(true);
        fm.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
    }
    public void refreshPan1(){
        accountInfoData = admin.getAccountInfo();
        pan1.remove(jscrollpane_pan1);
        accountTable = new JTable(accountInfoData, accountDataTitle);
        jscrollpane_pan1 = new JScrollPane(accountTable);
        jscrollpane_pan1.setSize(500,500);
        pan1.add(jscrollpane_pan1);
        pan1.setVisible(false);
        pan1.setVisible(true);
    }
    public void refreshPan6(){
        lessonInfoData = admin.getLessonInfo();
        pan6.remove(jscrollpane_pan6);
        lessonTable = new JTable(lessonInfoData,lessonDataTitle);
        jscrollpane_pan6 = new JScrollPane(lessonTable);
        jscrollpane_pan6.setSize(500,500);
        pan6.add(jscrollpane_pan6);
        pan6.setVisible(false);
        pan6.setVisible(true);
    }
    public void refreshPan9(){

        pan9.add(jscrollpane_pan9_2);
        jscrollpane_pan9_2.setLocation(100,0);
        jscrollpane_pan9_2.setSize(50,300);
        pan9.remove(allClassComboBox);
        allClassComboBox = new JComboBox(admin.getLessonIdName());
        allClassComboBox.setSize(100,50);
        allClassComboBox.setLocation(800,0);
        pan9.add(allClassComboBox);
        pan9.setVisible(false);
        pan9.setVisible(true);

    }


    public void actionPerformed(ActionEvent e) {
        if("帳戶管理".equals(e.getActionCommand())){
            card.show(cardpan, "b1");
        }
        if("印出成績單".equals(e.getActionCommand())){
            card.show(cardpan, "b5");
        }
        if("課程管理".equals(e.getActionCommand())){
            card.show(cardpan, "b6");
        }
        if("新增學生課程".equals(e.getActionCommand())){
            card.show(cardpan, "b9");
        }
    }
    
}
