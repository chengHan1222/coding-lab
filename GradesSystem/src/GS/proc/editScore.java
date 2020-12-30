package GS.proc;

import java.awt.BorderLayout;
import java.awt.Container;
import java.awt.SystemColor;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JScrollPane;

import GS.proc.component.Table;
import Other.Lesson;

public class editScore {
	
	editScore(int id){
		new Controller(new Model(id), new View());
	}
	
	editScore(int id, int semester){
		new Controller(new Model(id, semester), new View());
	}

	private class Controller {
		private Model model;
		private View view;
		
		Controller(Model m, View v){
			this.model = m;
			this.view = v;
			
			// init Controller
			view.setTable(model.getLessonData());
			view.btn.addActionListener(e -> {
				model.storeData(view.table.getTableData());
				view.frame.dispose();
			});
		}
	}
	
	private class Model {
		private Lesson lesson;
		
		Model(int LessonId){
			lesson = new Lesson(LessonId);
		}
		
		Model(int LessonId, int Semester){
			lesson = new Lesson(LessonId, Semester);
		}
		
		String[][] getLessonData(){
			return lesson.getAllScore();
		}
		
		public void storeData(String[][] data) {
			String strOutput = "";
			for (String[] rowData: data) {
				strOutput += rowData[2] + "&";
			}
			strOutput = strOutput.substring(0, strOutput.length() - 1);
			lesson.setAllScore(strOutput);
		}
		
	}
	
	private class View {
		private JFrame frame;
		private Container container;
		private JScrollPane scrollPane;
		private JButton btn;
		private Table table;
		
		View(){
			frame = new JFrame();
			frame.setTitle("歷年成績");
			container = frame.getContentPane();
			container.setLayout(new BorderLayout(0, 0));
			container.setBackground(SystemColor.activeCaptionBorder);
			frame.setBounds(100, 100, 500, 400);
			frame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
			
			btn = new JButton("確定");
			container.add(btn, BorderLayout.NORTH);
			
			scrollPane = new JScrollPane();
			container.add(scrollPane, BorderLayout.CENTER);
			
			frame.setVisible(true);
		}
		
		void setTable(String[][] data){
			String[] columns = {"Id", "學生姓名", "分數"};
			this.table = new Table(columns, data, true);
			scrollPane.setViewportView(this.table);
		}
		
	}
	
}
