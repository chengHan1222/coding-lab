package GS.proc;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Container;
import java.awt.Font;
import java.awt.SystemColor;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.border.LineBorder;

import Other.Lesson;
import User.Professor;

public class showLessonInfo {
	
	showLessonInfo(int id, int semester){
		new Controller(new Model(id, semester), new View());
	}

	private class Controller {
		private Model model;
		private View view;
		
		Controller(Model m, View v){
			this.model = m;
			this.view = v;
			
			// init Controller
			view.setInfo(model.getLesson());
			view.btnShowStudentList.addActionListener(e -> {
				new showStudentList(model.getLesson().id, model.getLesson().semester);
			});
		}
	}
	
	private class Model {
		
		private Lesson lesson;
		
		Model(int id, int semester){
			this.lesson = new Lesson(id, semester);
		}
		
		Lesson getLesson() {
			return this.lesson;
		}
		
	}
	
	private class View {
		private JFrame frame;
		private Container container;
		private JPanel panel;
		private JPanel paneId;
		private JLabel lbId;
		private JLabel lbInputId;
		private JPanel paneName;
		private JLabel lbName;
		private JLabel lbInputName;
		private JPanel paneProfessor;
		private JLabel lbProfessor;
		private JLabel lbInputProfessor;
		private JPanel paneCredits;
		private JLabel lbCredits;
		private JLabel lbInputCredits;
		private JPanel paneType;
		private JLabel lbType;
		private JLabel lbInputType;
		JButton btnShowStudentList;
		
		View(){
			frame = new JFrame();
			frame.setTitle("成績系統");
			container = frame.getContentPane();
			container.setBackground(SystemColor.activeCaptionBorder);
			container.setLayout(null);
			
			panel = new JPanel();
			panel.setBounds(43, 40, 399, 280);
			container.add(panel);
			panel.setLayout(null);
			
			paneId = new JPanel();
			paneId.setBorder(new LineBorder(new Color(0, 0, 0), 2, true));
			paneId.setBounds(123, 41, 58, 48);
			panel.add(paneId);
			paneId.setLayout(new BorderLayout(0, 0));
			
			lbId = new JLabel("ID     ");
			lbId.setFont(new Font("新細明體", Font.BOLD, 15));
			paneId.add(lbId, BorderLayout.WEST);
			
			lbInputId = new JLabel();
			lbInputId.setFont(new Font("新細明體", Font.PLAIN, 15));
			paneId.add(lbInputId, BorderLayout.CENTER);
			
			paneName = new JPanel();
			paneName.setBorder(new LineBorder(new Color(0, 0, 0), 2, true));
			paneName.setBounds(203, 41, 120, 48);
			panel.add(paneName);
			paneName.setLayout(new BorderLayout(0, 0));
			
			lbName = new JLabel("名稱    ");
			lbName.setFont(new Font("新細明體", Font.BOLD, 15));
			paneName.add(lbName, BorderLayout.WEST);
			
			lbInputName = new JLabel();
			lbInputName.setFont(new Font("新細明體", Font.PLAIN, 15));
			paneName.add(lbInputName, BorderLayout.CENTER);
			
			paneProfessor = new JPanel();
			paneProfessor.setBorder(new LineBorder(new Color(0, 0, 0), 2, true));
			paneProfessor.setBounds(147, 193, 100, 48);
			panel.add(paneProfessor);
			paneProfessor.setLayout(new BorderLayout(0, 0));
			
			lbProfessor = new JLabel("教授    ");
			lbProfessor.setFont(new Font("新細明體", Font.BOLD, 15));
			paneProfessor.add(lbProfessor, BorderLayout.WEST);
			
			lbInputProfessor = new JLabel();
			lbInputProfessor.setFont(new Font("新細明體", Font.PLAIN, 15));
			paneProfessor.add(lbInputProfessor, BorderLayout.CENTER);
			
			paneCredits = new JPanel();
			paneCredits.setBorder(new LineBorder(new Color(0, 0, 0), 2, true));
			paneCredits.setBounds(81, 120, 100, 48);
			panel.add(paneCredits);
			paneCredits.setLayout(new BorderLayout(0, 0));
			
			lbCredits = new JLabel("學分數    ");
			lbCredits.setFont(new Font("新細明體", Font.BOLD, 15));
			paneCredits.add(lbCredits, BorderLayout.WEST);
			
			lbInputCredits = new JLabel();
			lbInputCredits.setFont(new Font("新細明體", Font.PLAIN, 15));
			paneCredits.add(lbInputCredits, BorderLayout.CENTER);
			
			paneType = new JPanel();
			paneType.setBorder(new LineBorder(new Color(0, 0, 0), 2, true));
			paneType.setBounds(203, 120, 100, 48);
			panel.add(paneType);
			paneType.setLayout(new BorderLayout(0, 0));
			
			lbType = new JLabel("類別    ");
			lbType.setFont(new Font("新細明體", Font.BOLD, 15));
			paneType.add(lbType, BorderLayout.WEST);
			
			lbInputType = new JLabel();
			lbInputType.setFont(new Font("新細明體", Font.PLAIN, 15));
			paneType.add(lbInputType, BorderLayout.CENTER);
			
			btnShowStudentList = new JButton("選修學生清單");
			btnShowStudentList.setBounds(270, 250, 120, 25);
			panel.add(btnShowStudentList);

			frame.setBounds(100, 100, 500, 400);
			frame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
			frame.setVisible(true);
		}
		
		void setInfo(Lesson lesson) {
			lbInputId.setText(lesson.id + "");
			lbInputName.setText(lesson.name);
			lbInputProfessor.setText(new Professor(lesson.professorId).getName());
			lbInputCredits.setText(lesson.credits + "");
			lbInputType.setText(lesson.type);
		}
		
	}
	
}
