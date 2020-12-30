package GS.proc;

import Other.Lesson;
import User.Student;
import User.Manager;

import javax.swing.*;
import java.awt.event.*;
import java.text.SimpleDateFormat;
import java.util.Date;

public class addLessonForStudentFrame extends JFrame {
    private Manager admin = new Manager(1);
    private JTable studentTable;
    private JScrollPane studentTable_scrollPane;

    private JButton chooseBtn;
    private JFrame popFrame;
    private JButton addLessonBtn;
    private JButton deleteLessonBtn;
    private JComboBox newClassBox;
    private JTable classTable;
    private JScrollPane classTable__scrollPane;

    private String yearNow;



    public addLessonForStudentFrame(){
        studentTable = new JTable(admin.getStudentInfo(),new String[]{"學生ID"});
        studentTable_scrollPane = new JScrollPane(studentTable);
        chooseBtn = new JButton("選取");
        setPopFrame();

        this.setLayout(null);
        this.setSize(500,400);
        this.setLocation(400,350);

        this.add(studentTable_scrollPane);
        this.add(chooseBtn);

        studentTable_scrollPane.setSize(50,300);
        studentTable_scrollPane.setLocation(100,0);
        chooseBtn.setSize(90,90);
        chooseBtn.setLocation(220,80);

        yearNow = Integer.parseInt(new SimpleDateFormat("yyyy").format(new Date()))-1911+"";
        addListener();
        this.setVisible(true);
    }

    private void setPopFrame(){
        addLessonBtn = new JButton("增加課程");
        deleteLessonBtn = new JButton("刪除課程");
        newClassBox = new JComboBox();
        popFrame = new JFrame("選棄課選單");
        classTable = new JTable(new String[][]{{"id","name"}},new String[]{"課程ID","課程名稱"});
        classTable__scrollPane = new JScrollPane(classTable);

        popFrame.setLayout(null);
        popFrame.setTitle("修課系統");
        popFrame.setSize(400,400);
        popFrame.setLocation(400,200);
        popFrame.add(addLessonBtn);
        popFrame.add(deleteLessonBtn);
        popFrame.add(classTable__scrollPane);
        popFrame.add(newClassBox);

        addLessonBtn.setSize(120,20);
        addLessonBtn.setLocation(240,100);
        deleteLessonBtn.setSize(120,20);
        deleteLessonBtn.setLocation(240,120);
    }

    private void addListener(){
        chooseBtn.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                if(studentTable.getSelectedRow()==-1){
                    JOptionPane.showMessageDialog(null,"請選擇學生!");
                    return;
                }
                int stuID = Integer.parseInt(studentTable.getValueAt(studentTable.getSelectedRow(),0).toString());
                try {
                    String[] studentClass = new Student(stuID).getLessonList();
                    String[][] lessonList = admin.getLessonInfo();
                    String yearNowClass = "";
                    popFrame.getContentPane().remove(newClassBox);
                    newClassBox = new JComboBox();
                    boolean flag = false;
                    for(int i=0;i<studentClass.length;i=i+2){
                        if(studentClass[i].equals(yearNow)){
                            yearNowClass = studentClass[i+1];
                            flag = true;
                            break;
                        }
                    }
                    if(flag){
                        for(String[] line : lessonList){
                            boolean check = true;
                            for(String stuLesson : yearNowClass.split("&")){
                                if(line[0].equals(stuLesson)){
                                    check = false;
                                }
                            }
                            if(check){
                                Lesson currLesson  = new Lesson(Integer.parseInt(line[0]));
                                newClassBox.addItem(line[0]+":"+currLesson.name);
                            }
                        }
                    }
                    popFrame.add(newClassBox);
                    newClassBox.setSize(120,30);
                    newClassBox.setLocation(200,50);
                    refreshTable();
                    popFrame.setVisible(true);
                }
                catch (ArrayIndexOutOfBoundsException E){
                    //E.printStackTrace();
                    classTable__scrollPane.setLocation(20,50);
                    classTable__scrollPane.setSize(150,200);
                    String[][] lessonList = admin.getLessonInfo();
                    popFrame.getContentPane().remove(newClassBox);
                    newClassBox = new JComboBox();
                    for(String[] line : lessonList){
                        Lesson currLesson  = new Lesson(Integer.parseInt(line[0]));
                        newClassBox.addItem(line[0]+":"+currLesson.name);
                    }
                    popFrame.add(newClassBox);
                    newClassBox.setSize(120,30);
                    newClassBox.setLocation(200,50);
                    refreshTable();
                    popFrame.setVisible(true);
                }

            }
        });

        addLessonBtn.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                try {
                    int classID = Integer.parseInt(newClassBox.getSelectedItem().toString().split(":")[0]);
                    int stuID = Integer.parseInt(studentTable.getValueAt(studentTable.getSelectedRow(), 0).toString());
                    admin.addLessonForStudentInSemester(stuID, classID, Integer.parseInt(yearNow));
                    admin.setDefaultScoreForStudentInClass(stuID,classID,Integer.parseInt(yearNow));
                    JOptionPane.showMessageDialog(null,"新增成功");
                    refreshTable();
                    popFrame.setVisible(false);
                }
                catch (Exception E){
                    E.printStackTrace();
                    JOptionPane.showMessageDialog(null,"新增失敗!");
                }
            }
        });

        deleteLessonBtn.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                try {
                    if(classTable.getSelectedRow()==-1){
                        JOptionPane.showMessageDialog(null,"請選擇課程!");
                    }
                    int classID = Integer.parseInt(classTable.getValueAt(classTable.getSelectedRow(),0).toString());
                    int stuID = Integer.parseInt(studentTable.getValueAt(studentTable.getSelectedRow(), 0).toString());
                    admin.deleteScoreForStudentInClass(stuID,classID,Integer.parseInt(yearNow));
                    admin.deleteStudentLessonList(stuID,classID,Integer.parseInt(yearNow));
                    JOptionPane.showMessageDialog(null,"刪除成功");
                    refreshTable();
                    popFrame.setVisible(false);
                }
                catch (Exception E){
                    //E.printStackTrace();
                    JOptionPane.showMessageDialog(null,"刪除失敗!");
                }
            }
        });

        studentTable.addMouseListener(new MouseAdapter() {
            @Override
            public void mousePressed(MouseEvent e) {
                super.mousePressed(e);

            }
        });

        this.addWindowListener(new WindowAdapter() {
            @Override
            public void windowClosing(WindowEvent e) {
                exit();
            }
        });
    }
    private void refreshTable(){
        popFrame.getContentPane().remove(classTable__scrollPane);
        int stuID = Integer.parseInt(studentTable.getValueAt(studentTable.getSelectedRow(), 0).toString());
        try {
            String[] lessonList = new Student(stuID).getLessonList();
            String yearNowLesson = "";
            boolean flag = false;
            for(int i=0;i<lessonList.length;i=i+2){
                if(yearNow.equals(lessonList[i])){
                    flag = true;
                    yearNowLesson = lessonList[i+1];
                    break;
                }
            }
            if(flag){
                String[][] tableData = new String[yearNowLesson.split("&").length][];
                for(int i=0;i<yearNowLesson.split("&").length;i++){
                    Lesson lesson = new Lesson(Integer.parseInt(yearNowLesson.split("&")[i]));
                    tableData[i] = (yearNowLesson.split("&")[i] +"," + lesson.name).split(",");
                }
                classTable = new JTable(tableData,new String[]{"課程ID","課程名稱"});
            }
            else {
                classTable = new JTable(new String[][]{{"id","name"}},new String[]{"課程ID","課程名稱"});
            }
        }
        catch (ArrayIndexOutOfBoundsException E){
            //E.printStackTrace();
            classTable = new JTable(new String[][]{{"id","name"}},new String[]{"課程ID","課程名稱"});
        }

        finally {
            classTable__scrollPane = new JScrollPane(classTable);
            popFrame.add(classTable__scrollPane);
            classTable__scrollPane.setLocation(20,50);
            classTable__scrollPane.setSize(150,200);
        }


    }

    public void exit(){
        int yesOrNo =JOptionPane.showConfirmDialog(null,"確定退出?","確認",JOptionPane.YES_NO_OPTION);
        if(yesOrNo==1){
            this.setDefaultCloseOperation(DO_NOTHING_ON_CLOSE);
        }
        else {
            this.setVisible(false);
        }
    }

}

