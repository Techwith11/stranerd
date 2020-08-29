<template>
	<div>
		<vue-editor :value="model" @input="$emit('update:model',$event)" useCustomImageHandler @image-added="handleImageUpload"
			:placeholder="placeholder" :class="{'border border-danger': error, 'border border-success': valid }"
			:editor-toolbar="customToolBar"
		/>
		<span class="small text-danger" v-if="error">{{ error }}</span>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { VueEditor } from 'vue2-editor'
import { Notify } from '@root/application/config/notifications'
import { UploaderService } from '@root/modules/core/services/uploader'

const customToolBar = [
	[{size:['small',false,'large','huge']}],
	/*[{header: [false,1,2,3,4,5,6]}],*/ ['bold','italic','underline','strike'],
	[{script: 'sub'},{script: 'super'}],
	[{indent: '-1'},{indent: '+1'}],
	/*[{align:''},{align:'center'},{align:'right'},{align:'justify'}],*/
	['blockquote','code-block'], [{list:'ordered'},{list:'bullet'},/*{list:'check'}*/],
	/*[{color:[]},{background:[]}],*/ ['link','image',/*'video','formula'*/],['clean']
]

export default defineComponent({
	components: { 'vue-editor': VueEditor },
	props: {
		model: {
			required: true
		},
		path: {
			required: true,
			type: String
		},
		placeholder: {
			required: true,
			type: String
		},
		error: {
			required: true
		},
		valid: {
			required: true
		}
	},
	setup(props){
		return {
			customToolBar,
			handleImageUpload: async (file: File, editor: any, cursorLocation: any, resetUploader: any) => {
				try{
					const res = await UploaderService.call(props.path, file)
					editor.insertEmbed(cursorLocation, 'image', res.link)
					resetUploader()
				}catch(e){ await Notify({ title: e, icon: 'error' }) }
			}
		}
	}
})
</script>
