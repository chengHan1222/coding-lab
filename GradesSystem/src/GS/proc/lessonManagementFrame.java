package GS.proc;

import User.Manager;

import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

public class lessonManagementFrame extends JFrame {
    private Manager admin = new Manager(1);
    private JTable lessonTable;
    private JScrollPane lessonTable_scrollPane;
    private JButton addLessonButton;
    private JButton modifyLessonButton;
    private JButton deleteLessonButton;

    private JFrame popFrame;
    private JLabel classIdLabel;
    private JTextField classIdField;
    private JLabel classNameLabel;
    private JTextField classNameField;
    private JLabel professorIdLabel;//改用box
    private JComboBox professorIdBox;
    private JLabel classCreditLabel;
    private JTextField classCreditField;
    private JComboBox classTypeBox;
    private JButton confirm_btn;
    private JLabel remindLabel1;
    private JLabel remindLabel2;

    public lessonManagementFrame(){
        lessonTable = new JTable(admin.getLessonInfo(),new Object[]{"課程ID","課程名稱","教授ID","學分數","必/選"});
        lessonTable_scrollPane = new JScrollPane(lessonTable);
        addLessonButton =new JButton("新增");
        modifyLessonButton = new JButton("送出修改");
        deleteLessonButton =new JButton("刪除");
        remindLabel1 = new JLabel("修改資料後");
        remindLabel2 = new JLabel("請按\"送出修改\"");

        this.setLayout(null);
        this.setTitle("課程管理");
        this.setSize(520,350);
        this.setLocation(400,200);
        this.add(lessonTable_scrollPane);
        this.add(addLessonButton);
        this.add(modifyLessonButton);
        this.add(deleteLessonButton);
        this.add(remindLabel1);
        this.add(remindLabel2);

        lessonTable_scrollPane.setSize(350,300);
        lessonTable_scrollPane.setLocation(10,10);

        addLessonButton.setSize(100,20);
        addLessonButton.setLocation(400,20);
        modifyLessonButton.setSize(100,20);
        modifyLessonButton.setLocation(400,40);
        deleteLessonButton.setSize(100,20);
        deleteLessonButton.setLocation(400,60);
        remindLabel1.setSize(100,30);
        remindLabel1.setLocation(400,80);
        remindLabel2.setSize(100,30);
        remindLabel2.setLocation(400,100);

        setPopFrame();
        addListener();
        this.setVisible(true);
    }

    private void setPopFrame(){
        popFrame = new JFrame("新增課程");
        classIdLabel = new JLabel("請輸入新增課程的ID");
        classIdField = new JTextField(20);
        classNameLabel = new JLabel("請輸入課程名稱");
        classNameField = new JTextField(20);
        professorIdLabel = new JLabel("請輸入該課程教授ID");//box
        professorIdBox = new JComboBox();
        classCreditLabel = new JLabel("輸入學分數");
        classCreditField = new JTextField(20);
        classTypeBox = new JComboBox(new Object[]{"必修","選修"});
        confirm_btn = new JButton("送出");

        for(String[] data : admin.getAccountInfo()){
            if("professor".equals(data[4].toLowerCase())){
                professorIdBox.addItem(data[0]);
            }
        }

        popFrame.setLayout(null);
        popFrame.setSize(400,250);
        popFrame.setLocation(400,200);
        popFrame.add(classIdLabel);
        popFrame.add(classIdField);
        popFrame.add(classNameLabel);
        popFrame.add(classNameField);
        popFrame.add(professorIdLabel);
        popFrame.add(professorIdBox);
        popFrame.add(classCreditLabel);
        popFrame.add(classCreditField);
        popFrame.add(classTypeBox);
        popFrame.add(confirm_btn);

        classIdLabel.setSize(120,20);
        classIdLabel.setLocation(100,50);
        classIdField.setSize(120,20);
        classIdField.setLocation(220,50);
        classNameLabel.setSize(120,20);
        classNameLabel.setLocation(100,70);
        classNameField.setSize(120,20);
        classNameField.setLocation(220,70);
        professorIdLabel.setSize(120,20);
        professorIdLabel.setLocation(100,90);
        professorIdBox.setSize(120,20);
        professorIdBox.setLocation(220,90);
        classCreditLabel.setSize(120,20);
        classCreditLabel.setLocation(100,110);
        classCreditField.setSize(120,20);
        classCreditField.setLocation(220,110);
        classTypeBox.setSize(120,20);
        classTypeBox.setLocation(220,130);
        confirm_btn.setSize(120,20);
        confirm_btn.setLocation(220,150);
    }

    private void addListener(){
        addLessonButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                popFrame.setVisible(true);
            }
        });

        modifyLessonButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                try {

                    String newData = "";
                    for(int i = 0; i< lessonTable.getRowCount(); i++){
                        for(int j = 0; j< lessonTable.getColumnCount(); j++){
                            newData += lessonTable.getValueAt(i,j)+",";
                        }
                        newData = newData.substring(0,newData.length()-1);
                        newData += "\n";
                    }
                    admin.modifyLessonInfo(newData);
                    refreshTable();
                    JOptionPane.showMessageDialog(null,"修改成功!");

                }
                catch (NumberFormatException E){
                    JOptionPane.showMessageDialog(null,"ID和學分數只能輸入數字!");
                    return;
                }
            }

        });

        deleteLessonButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                try {
                    int lessonId = Integer.parseInt(lessonTable.getValueAt(lessonTable.getSelectedRow(), 0).toString());
                    int yesOrNo =JOptionPane.showConfirmDialog(null,"確定修改?","確認",JOptionPane.YES_NO_OPTION);
                    if(yesOrNo==1){
                        return;
                    }
                    admin.deleteLessonInfo(lessonId);
                    refreshTable();
                }
                catch (ArrayIndexOutOfBoundsException E){
                    JOptionPane.showMessageDialog(null,"請選擇要刪除的課程!");
                    return;
                }
            }
        });
        this.addWindowListener(new WindowAdapter() {
            @Override
            public void windowClosing(WindowEvent e) {
                exit();
            }
        });

        confirm_btn.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                try {
                    int classID = Integer.parseInt(classIdField.getText());
                    for(String[] data :admin.getLessonInfo()){
                        if(data.equals(classID+"")){
                            JOptionPane.showMessageDialog(null,"課程ID已存在!");
                            return;
                        }
                    }
                    String className = classNameField.getText();
                    int professorID = Integer.parseInt(professorIdBox.getSelectedItem().toString());
                    int classCredits = Integer.parseInt(classCreditField.getText());
                    String classType = classTypeBox.getSelectedItem().toString();
                    admin.createNewLessonInfo(classID, className, professorID + "", classCredits, classType);
                    refreshTable();
                    popFrame.setVisible(false);
                    JOptionPane.showMessageDialog(null,"新增成功");
                }
                catch (NumberFormatException E){
                    JOptionPane.showMessageDialog(null,"ID 學分只能輸入數字");
                }
            }
        });
    }

    private void refreshTable(){
        this.getContentPane().remove(lessonTable_scrollPane);
        lessonTable = new JTable(admin.getLessonInfo(),new Object[]{"課程ID","課程名稱","教授ID","學分數","必/選"});
        lessonTable_scrollPane = new JScrollPane(lessonTable);
        this.getContentPane().add(lessonTable_scrollPane);
        lessonTable_scrollPane.setSize(350,300);
        lessonTable_scrollPane.setLocation(10,10);
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

